/** @format */

import { UnAuthenticatedError, UnAuthorizedError } from "@/errors";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/utils";

export async function autenticateUser(
  req: any,
  res: NextApiResponse,
  next: any
) {
  const ATS = req.cookies.ATS;
  
  if (!ATS) {
    return UnAuthenticatedError(res, "Not Authenticated");
  }

  try {
    const validated = validateToken(ATS);
    if (validated) {
      // console.log(validated);
      req.user = validated;
      return await next();
    }
  } catch {
    return UnAuthenticatedError(res, "Invalid Session");
  }
}

export const authorizePermissions =
  (...roles: number[]) =>
  (req: any, res: NextApiResponse, next: any) => {
    if (!roles.includes(req.user.role)) {
      return UnAuthorizedError(res, "Unauthorized to access this route");
    }
    return next();
  };
