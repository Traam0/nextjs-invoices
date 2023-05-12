// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
type Data = {
	ip: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	// console.log(req.headers);
	// // mongoose.deleteModel('User')
	// // mongoose.deleteModel("Client");
	res.status(200).json({ ip: 'xxx.xxx.xxx.xxx'});
}


