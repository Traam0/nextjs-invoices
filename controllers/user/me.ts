import User from "@/models/user";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export async function getThy(req: any, res: NextApiResponse): Promise<void> {
  const user = await User.findById(req.user.id);
  if (!user) res.status(StatusCodes.NOT_FOUND).json(null);

  const { password, ...rest } = user._doc;
  res.status(StatusCodes.OK).json({
    ...rest,
    role: user.role == process.env.ADMIN_CODE ? "type.admin" : "type.operator",
  });
}
