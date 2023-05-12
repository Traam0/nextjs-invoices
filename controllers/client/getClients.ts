import client from "@/models/clients";
import User from "@/models/user";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export async function getClients(req: any, res: NextApiResponse) {
	try {
		// console.log(req.user.id);

		const clients = await client.find(
			{ holder_id: req.user.id },
			{ holder_id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);
		// console.log(clients);
		res.status(StatusCodes.OK).json({ clients });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
}