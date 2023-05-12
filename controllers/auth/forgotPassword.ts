import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import { NotFoundError } from "@/errors";
import crypto from "crypto";

export async function forgotPassword(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email }: { email: string } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw NotFoundError(res, "Account doesn't exists");
  const recoveryToken = crypto.randomBytes(60).toString("hex");
}
