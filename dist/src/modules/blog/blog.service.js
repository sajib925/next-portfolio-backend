import { PrismaClient } from "@prisma/client";
import AppError from "../../errorHelper/appError.js";
import httpStatus from "http-status-codes";
const prisma = new PrismaClient();
const createBlog = async (payload) => {
    const blog = await prisma.blog.create({
        data: payload,
    });
    return blog;
};
const getAllBlogs = async () => {
    return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
};
const getBlogById = async (id) => {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog)
        throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
    return blog;
};
const updateBlog = async (id, payload) => {
    const blog = await prisma.blog.update({
        where: { id },
        data: payload,
    });
    return blog;
};
const deleteBlog = async (id) => {
    await prisma.blog.delete({ where: { id } });
};
export const BlogServices = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
