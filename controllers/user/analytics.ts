import { NextApiResponse } from "next";
import Invoice from "@/models/invoices";
import { StatusCodes } from "http-status-codes";
import Client from "@/models/clients";

export async function getAnalytics(
	req: any,
	res: NextApiResponse
): Promise<void> {
	const clients = await Client.distinct("_id", {
		holder_id: req.user.id,
	});
	const invoicesCount = await Invoice.count({ issuer: req.user.id });

	const totalIncome = await Invoice.aggregate([
		{ $match: { issuer: req.user.id, payed: true, rest: 0 } },
		{ $group: { _id: "$issuer", totalIncome: { $sum: "$totalTTC" } } },
		{ $project: { _id: 0, value: { $round: ["$totalIncome", 2] } } },
	]);

	const pendingIncome = await Invoice.aggregate([
		{
			$match: {
				issuer: req.user.id,
				payed: false,
			},
		},
		{ $group: { _id: "$issuer", pendingIncome: { $sum: "$totalTTC" } } },
		{ $project: { _id: 0, value: { $round: ["$pendingIncome", 2] } } },
	]);

	const incomePerMonth = await Invoice.aggregate([
		{
			$match: {
				issuer: req.user.id,
				payed: true,
			},
		},
		{
			$group: {
				_id: {
					year: { $year: "$updatedAt" },
					month: { $month: "$updatedAt" },
				},
				totalIncome: { $sum: "$totalTTC" },
			},
		},
		{
			$project: {
				_id: 0,
				year: "$_id.year",
				month: "$_id.month",
				value: { $round: ["$totalIncome", 2] },
			},
		},
	]);

	// const clientsPerMonth = await Client.aggregate([
	// 	{ $match: { holder_id: req.user.id } },
	// 	{
	// 		$sort: {
	// 			createdAt: 1,
	// 		},
	// 	},
	// 	{
	// 		$group: {
	// 			_id: {
	// 				year: { $year: "$createdAt" },
	// 				month: { $month: "$createdAt" },
	// 			},
	// 			totalClients: { $sum: 1 },
	// 		},
	// 	},
	// 	{
	// 		$sort: {
	// 			"_id.year": 1,
	// 			"_id.month": 1,
	// 		},
	// 	},
	// 	{
	// 		$group: {
	// 			_id: null,
	// 			monthlyData: {
	// 				$push: {
	// 					year: "$_id.year",
	// 					month: "$_id.month",
	// 					totalClients: "$totalClients",
	// 				},
	// 			},
	// 		},
	// 	},
	// 	{
	// 		$addFields: {
	// 			monthlyData: {
	// 				$map: {
	// 					input: "$monthlyData",
	// 					as: "data",
	// 					in: {
	// 						year: "$$data.year",
	// 						month: "$$data.month",
	// 						totalClients: {
	// 							$sum: {
	// 								$slice: [
	// 									"$monthlyData.totalClients",
	// 									{
	// 										$subtract: [
	// 											{ $indexOfArray: ["$monthlyData", "$$data"] },
	// 											{
	// 												$indexOfArray: [
	// 													"$monthlyData",
	// 													{ year: 1970, month: 1 },
	// 												],
	// 											},
	// 										],
	// 									},
	// 								],
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// 	{
	// 		$unwind: "$monthlyData",
	// 	},
	// 	{
	// 		$replaceRoot: {
	// 			newRoot: "$monthlyData",
	// 		},
	// 	},
	// 	{
	// 		$project: {
	// 			_id: 0,
	// 			year: 1,
	// 			month: 1,
	// 			totalClients: 1,
	// 		},
	// 	},
	// ]);

	const clientsPerMonth = await Client.aggregate([
		{
			$match: {
				holder_id: req.user.id,
			},
		},
		{
			$group: {
				_id: {
					year: { $year: "$updatedAt" },
					month: { $month: "$updatedAt" },
				},
				count: { $sum: 1 },
			},
		},
		{
			$project: {
				_id: 0,
				year: "$_id.year",
				month: "$_id.month",
				value: "$count",
			},
		},
	]);

	const avgIncome = await Invoice.aggregate([
		{ $match: { payed: true } },
		{ $group: { _id: null, avg_val: { $avg: "$totalTTC" } } },
		{
			$project: {
				average: { $round: ["$avg_val", 2] },
				_id: 0,
			},
		},
	]);

	res.status(StatusCodes.OK).json({
		client_count: clients.length,
		invoicesCount,
		totalIncome: totalIncome[0].value,
		pendingIncome: pendingIncome[0].value,
		incomePerMonth: incomePerMonth.sort((a, b) => a.month - b.month),
		clientsPerMonth: clientsPerMonth.sort((a, b) => a.month - b.month),
		averageIncome: avgIncome[0].average,
	});
}
