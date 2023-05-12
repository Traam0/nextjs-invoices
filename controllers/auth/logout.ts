import { deleteCookie, hasCookie } from "cookies-next";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export async function logout(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	deleteCookie("ATS", {
		req,
		res,
		httpOnly: true,
	});

	if (!hasCookie("ATS", { req, res })) {
		res.status(StatusCodes.OK).json("logged out");
	} else {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json("manually clear cookies");
	}
}
