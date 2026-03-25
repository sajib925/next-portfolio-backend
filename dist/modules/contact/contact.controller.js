import {} from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync.js";
import { ContactServices } from "./contact.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
const createContact = catchAsync(async (req, res) => {
    const result = await ContactServices.createContact(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Contact created successfully",
        data: result,
    });
});
const getAllContacts = catchAsync(async (_req, res) => {
    const result = await ContactServices.getAllContacts();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contacts retrieved successfully",
        data: result,
    });
});
const getContactById = catchAsync(async (req, res) => {
    const result = await ContactServices.getContactById(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact retrieved successfully",
        data: result,
    });
});
const updateContact = catchAsync(async (req, res) => {
    const result = await ContactServices.updateContact(Number(req.params.id), req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact updated successfully",
        data: result,
    });
});
const deleteContact = catchAsync(async (req, res) => {
    await ContactServices.deleteContact(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Contact deleted successfully",
        data: null,
    });
});
const replyContact = catchAsync(async (req, res) => {
    const id = Number(req.params.id);
    const { reply } = req.body;
    const updated = await ContactServices.replyToContact(id, reply);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Reply sent and contact updated successfully",
        data: updated,
    });
});
export const ContactControllers = { createContact, getAllContacts, getContactById, updateContact, deleteContact, replyContact };
