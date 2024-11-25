import { NextFunction, Request, RequestHandler, Response } from 'express'
import nodemailer from 'nodemailer'
import { validateContactSchema } from '../validations/nodemailer.validation.js'

export const sendUsMessageController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, phone, subject, message } = req.body

    const { error } = validateContactSchema({
      ...req.body,
      phone: phone.toString(),
    })

    if (error) {
      res.status(400).json({ error: error.message })
      return console.error(error.message)
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    })

    const information = await transporter.sendMail({
      from: email,
      to: process.env.USER,
      subject: subject,
      text: `Phone number: ${phone}, Full name: ${fullName}, Message: ${message}`,
      replyTo: email,
    })

    res.status(200).json({ message: 'email sent successfully', information })
  } catch (err) {
    next(err)
  }
}
