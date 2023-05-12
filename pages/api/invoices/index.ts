/** @format */

import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connDB } from "@/utils";
import { autenticateUser } from "@/middlewares/authMiddleware";
import { getInvoices } from "@/controllers/invoices/getInvoices";

const handler = nc({
	onError: (err, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});

handler.use(connDB).use(autenticateUser).get(getInvoices);

export default handler;
