import {} from "express";
import httpStatus from "http-status-codes";
import {} from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync.js";
import { AuthServices } from "./auth.service.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import { sendResponse } from "../../utils/sendResponse.js";
const login = catchAsync(async (req, res) => {
    const result = await AuthServices.login(req.body);
    setAuthCookie(res, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Logged in successfully",
        data: result,
    });
});
const refreshToken = catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await AuthServices.getNewAccessToken(refreshToken);
    setAuthCookie(res, result);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New access token generated",
        data: result,
    });
});
const logout = catchAsync(async (_req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
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
