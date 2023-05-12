/** @format */

import jswt from "jsonwebtoken";
// const jswt = require('jsonwebtoken')

export function signToken(payload: object): string {
  return jswt.sign(payload, process.env.JSWT_SECRET as string, { expiresIn: "30d" });
}

export function validateToken(payload: string) {
  return jswt.verify(payload, process.env.JSWT_SECRET as string);
}
