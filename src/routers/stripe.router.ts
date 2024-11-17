import { Router } from 'express'
import {
  createPaymentIntent,
  createPendingIntent,
  getPaymentIntent,
  retrieveSession,
} from '../controllers/stripe.controller.js'

const stripeRouter = Router()

stripeRouter.post('/create/payment/intent', createPaymentIntent)
stripeRouter.post('/create/pending/intent', createPendingIntent)
stripeRouter.get('/session/get/:sessionId', retrieveSession)
stripeRouter.get('/paymentIntent/:paymentIntentId', getPaymentIntent)

export default stripeRouter
