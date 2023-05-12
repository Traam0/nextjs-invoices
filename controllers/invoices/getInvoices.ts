import Invoice from "@/models/invoices";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export async function getInvoices(
	req: any,
	res: NextApiResponse
): Promise<void> {
	try {
		const invoices = await Invoice.find({ issuer: req.user.id });
		res.status(StatusCodes.OK).json({ invoices });
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
