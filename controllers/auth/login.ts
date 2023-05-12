import User from "@/models/user";
import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { attachCookies, signToken } from "@/utils";
import { BadRequestError, NotFoundError, UnAuthenticatedError } from "@/errors";
import { NextApiRequest, NextApiResponse } from "next";

export async function login(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const credentials: { email: string; password: string } = req.body;
  const salt = await bcryptjs.genSalt(10);

  const user = await User.findOne({ email: credentials.email });

  if (!user) throw NotFoundError(res, "Invalid Credentials");

  const doesMatch = await bcryptjs.compare(credentials.password, user.password);
  if (!doesMatch) throw UnAuthenticatedError(res, "Invalid Credentials");

  const token = signToken({
    id: user._id,
    email: user.email,
    role: user.role,
    verified: user.verified,
  });

  attachCookies({ req, res, token });
  res.status(200).json({
    _id: user._id,
    email: user._email,
    verified: user.verified,
    role: user.role == process.env.ADMIN_CODE ? "type.admin" : "type.operator",
  });
}
