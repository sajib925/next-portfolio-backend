import {} from "express";
import httpStatus from "http-status-codes";
import {} from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthServices } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
const login = catchAsync(async (req, res) => {
    const result = await AuthServices.login(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged in successfully",
        data: { token: result.accessToken, refreshToken: result.refreshToken },
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken: token } = req.body;
    const result = await AuthServices.getNewAccessToken(token);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New access token generated",
        data: { token: result.accessToken },
    });
});
const logout = catchAsync(async (_req, res) => {
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged out successfully",
        data: null,
    });
});
const changePassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const decoded = req.user;
    await AuthServices.changePassword(oldPassword, newPassword, decoded);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password changed successfully",
        data: null,
    });
});
const getProfile = catchAsync(async (req, res) => {
    const decoded = req.user;
    const result = await AuthServices.getProfile(Number(decoded.userId));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile retrieved successfully",
        data: result,
    });
});
const updateProfile = catchAsync(async (req, res) => {
    const decoded = req.user;
    const result = await AuthServices.updateProfile(Number(decoded.userId), req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile updated successfully",
        data: result,
    });
});
export const AuthControllers = {
    login,
    refreshToken,
    logout,
    changePassword,
    getProfile,
    updateProfile,
};
