import { Router } from 'express'
import { initiatePaymentController } from '../../controllers/banks/tbc.controller.js'

const tbcRouter = Router()

tbcRouter.post('/process/payment', initiatePaymentController)

export default tbcRouter
