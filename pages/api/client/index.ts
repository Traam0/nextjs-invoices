/** @format */

import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connDB } from "@/utils";
import { getClients } from "@/controllers/client";
import { autenticateUser } from "@/middlewares/authMiddleware";
import { StatusCodes } from "http-status-codes";

const handler = nc({
	onError: (err, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err.stack);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(StatusCodes.NOT_FOUND).end("Page is not found");
	},
});

handler.use(connDB).use(autenticateUser).get(getClients);

export default handler;
