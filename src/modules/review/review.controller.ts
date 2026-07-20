import type { Request, Response } from "express"
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync.js"
import { sendResponse } from "../../utils/sendResponse.js"
import { ReviewServices } from "./review.service.js"


const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReview(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  })
})

const getAllReviews = catchAsync(async (_req: Request, res: Response) => {
  const result = await ReviewServices.getAllReview()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Get all review successfully",
    data: result,
  })
})

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  await ReviewServices.deleteReview(Number(req.params.id))
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review deleted successfully",
    data: null,
  })
})

export const ReviewControllers = {
  createReview,
  getAllReviews,
  deleteReview,
}