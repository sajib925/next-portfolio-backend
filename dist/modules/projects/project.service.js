import { PrismaClient } from "@prisma/client";
import AppError from "../../errorHelper/appError.js";
import httpStatus from "http-status-codes";
const prisma = new PrismaClient();
const createProject = async (payload) => prisma.project.create({ data: payload });
const getAllProjects = async () => prisma.project.findMany({ orderBy: { createdAt: "desc" } });
const getProjectById = async (id) => {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project)
        throw new AppError(httpStatus.NOT_FOUND, "Project not found");
    return project;
};
const updateProject = async (id, payload) => prisma.project.update({ where: { id }, data: payload });
const deleteProject = async (id) => prisma.project.delete({ where: { id } });
export const ProjectServices = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
