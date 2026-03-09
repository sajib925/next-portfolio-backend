import { type Request, type Response } from "express"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync.js"
import { ProjectServices } from "./project.service.js"
import { sendResponse } from "../../utils/sendResponse.js"

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.createProject(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  })
})

const getAllProjects = catchAsync(async (_req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjects()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects retrieved successfully",
    data: result,
  })
})

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getProjectById(Number(req.params.id))
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully",
    data: result,
  })
})

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.updateProject(Number(req.params.id), req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully",
    data: result,
  })
})

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  await ProjectServices.deleteProject(Number(req.params.id))
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully",
    data: null,
  })
})

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
}