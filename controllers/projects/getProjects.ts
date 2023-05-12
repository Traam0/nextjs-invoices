import { NotFoundError } from "@/errors";
import Project from "@/models/project";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export async function getProjects(
  req: any,
  res: NextApiResponse
): Promise<void> {
  const projects = await Project.find(
    { ownerID: req.user.id },
    {
      _id: 1,
      title: 1,
      description: 1,
      type: 1,
      paymentMethod: 1,
      cost: 1,
      status: 1,
      payed: 1,
    }
  );

  if (!projects) throw NotFoundError(req, "No projects found");

  res.status(StatusCodes.OK).json({ count: projects.length, items: projects });
}
