import User from "@/models/user";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export async function getSession(req: any, res: NextApiResponse): Promise<void> {
  const user = await User.findById(req.user.id);
  if (user)
    return res.status(StatusCodes.OK).json({
      user: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role:
          user.role == process.env.ADMIN_CODE ? "type.admin" : "type.operator",
      },
    });

  res.status(StatusCodes.NOT_FOUND).json("s");
}
