import { PrismaClient } from "@prisma/client"
import AppError from "../../errorHelper/appError.js"
import httpStatus from "http-status-codes"
import { sendEmail } from "./email.service.js"

const prisma = new PrismaClient()

const createContact = async (payload: { name: string; email: string; subject?: string; message: string }) =>
  prisma.contact.create({ data: payload })

const getAllContacts = async () =>
  prisma.contact.findMany({ orderBy: { createdAt: "desc" } })

const getContactById = async (id: number) => {
  const contact = await prisma.contact.findUnique({ where: { id } })
  if (!contact) throw new AppError(httpStatus.NOT_FOUND, "Contact not found")
  return contact
}

const updateContact = async (id: number, payload: Partial<{ replied: boolean; reply?: string }>) =>
  prisma.contact.update({ where: { id }, data: payload })

const deleteContact = async (id: number) =>
  prisma.contact.delete({ where: { id } })

const replyToContact = async (id: number, replyMessage: string) => {
  const contact = await prisma.contact.findUnique({ where: { id } })
  if (!contact) throw new AppError(httpStatus.NOT_FOUND, "Contact not found")

  // Single nicely formatted HTML email
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <h2>Hi ${contact.name},</h2>
    <p>Thank you for reaching out via my portfolio website. I’ve received your message:</p>
    <blockquote style="background:#f4f4f4; padding:10px; border-left:5px solid #007bff;">
      "${contact.message}"
    </blockquote>
    <p><strong>My reply:</strong></p>
    <p>${replyMessage}</p>
    <hr />
    <p>Best regards,<br/>
    <strong>Sajib Ahmed</strong><br/>
    <a href="https://sajib-portfolio.com">Portfolio</a> | 
    <a href="https://github.com/hmsajibahmed15">GitHub</a> | 
    <a href="https://www.linkedin.com/in/hmsajibahmed15">LinkedIn</a> | 
    <a href="https://twitter.com/hmsajibahmed15">Twitter</a>
    </p>
  </div>
  `

  await sendEmail(contact.email, `Reply to your message on Sajib Ahmed Portfolio`, htmlContent)

  const updated = await prisma.contact.update({
    where: { id },
    data: { replied: true, reply: replyMessage },
  })

  return updated
}

export const ContactServices = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  replyToContact,
}