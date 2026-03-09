import {} from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { BlogServices } from "./blog.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
const createBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlog(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Blog created successfully",
        data: result,
    });
});
const getAllBlogs = catchAsync(async (_req, res) => {
    const result = await BlogServices.getAllBlogs();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blogs retrieved successfully",
        data: result,
    });
});
const getBlogById = catchAsync(async (req, res) => {
    const result = await BlogServices.getBlogById(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog retrieved successfully",
        data: result,
    });
});
const updateBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.updateBlog(Number(req.params.id), req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog updated successfully",
        data: result,
    });
});
const deleteBlog = catchAsync(async (req, res) => {
    await BlogServices.deleteBlog(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog deleted successfully",
        data: null,
    });
});
export const BlogControllers = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
