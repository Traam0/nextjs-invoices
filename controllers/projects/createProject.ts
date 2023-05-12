import { NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import Project from "@/models/project";

export async function createProject(
  req: any,
  res: NextApiResponse
): Promise<void> {
  try {
    const project = await Project.create({ ...req.body, ownerID: req.user.id, dueDate: new Date().toISOString() });
    res.status(StatusCodes.CREATED).json(project._doc);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}
