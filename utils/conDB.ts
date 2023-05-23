/** @format */

import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export async function connDB(
	req: NextApiRequest,
	res: NextApiResponse,
	next: any
) {
	await connect(
		process.env.NODE_ENV === "production"
			? (process.env.MONGO_URI_P as string)
			: (process.env
					.MONGO_URI as string) /* process.env.MONGO_URI_P as string */
	);
	return await next();
}
