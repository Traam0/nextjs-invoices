import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connDB } from "@/utils";
import { login } from "@/controllers/auth";

const handler = nc({
	onError: (err, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});

handler.use(connDB).post(login);

export default handler;
