import { Router } from 'express'
import {
  createPaymentIntent,
  retrieveSession,
} from '../controllers/stripe.controller.js'

const stripeRouter = Router()

stripeRouter.post('/create/payment/intent', createPaymentIntent)
stripeRouter.get('/session/get/:sessionId', retrieveSession)

export default stripeRouter
