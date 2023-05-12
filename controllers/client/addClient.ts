import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { ConflictError } from "@/errors";
import Client from "@/models/clients";

export async function addClient(req: any, res: NextApiResponse) {
	try {
		const conflict = await Client.find({
			holder_id: req.user.id,
			$or: [{ name: req.body.name }, { ICE: req.body.ICE }],
		});

		if (conflict.length > 0) throw ConflictError(res, "Client already exists");

		const client = await Client.create({ ...req.body, holder_id: req.user.id });

		res.status(StatusCodes.CREATED).json({ ...client._doc });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
}
