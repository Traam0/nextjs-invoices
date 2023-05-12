import { NextApiResponse } from "next";
import Invoice from "@/models/invoices";
import { StatusCodes } from "http-status-codes";

export async function createInvoice(req: any, res: NextApiResponse) {
	// console.log('------------------------------------------')
	// console.log(req.body)
	const invoice = await Invoice.create({ ...req.body, issuer: req.user.id });
	res.status(StatusCodes.CREATED).json({ ...invoice._doc });
	try {
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
}
