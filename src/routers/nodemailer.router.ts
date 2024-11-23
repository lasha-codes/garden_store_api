import { Router } from 'express'
import { sendUsMessageController } from '../controllers/nodemailer.controller.js'

const emailRouter = Router()

emailRouter.post('/contact', sendUsMessageController)

export default emailRouter
