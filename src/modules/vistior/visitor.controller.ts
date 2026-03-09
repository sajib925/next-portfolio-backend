import { type Request, type Response } from "express"
import { catchAsync } from "../../utils/catchAsync.js"
import { VisitorServices } from "./visitor.service.js"
import { sendResponse } from "../../utils/sendResponse.js"

const logVisitor = catchAsync(async (req: Request, res: Response) => {
  const { ip, userAgent, page, referrer, country, city, device, browser } = req.body

  const result = await VisitorServices.logVisitorAndCount({
    ip,
    userAgent,
    page,
    referrer,
    country,
    city,
    device,
    browser,
  })

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Visitor logged successfully",
    data: result, 
  })
})

const getAllVisitors = catchAsync(async (_req: Request, res: Response) => {
  const result = await VisitorServices.getAllVisitors()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All visitors retrieved successfully",
    data: result,
  })
})

export const VisitorControllers = { logVisitor, getAllVisitors }