import { Router } from 'express'
import {
  confirmPaymentIntent,
  createPaymentIntent,
  createPendingIntent,
  getPaymentIntent,
  retrievePayments,
  retrieveSession,
} from '../controllers/stripe.controller.js'
import cacheMiddleware from '../middlewares/cache.middleware.js'

const stripeRouter = Router()

stripeRouter.post('/create/payment/intent', createPaymentIntent)
stripeRouter.post('/create/pending/intent', createPendingIntent)
stripeRouter.post('/payment/confirm', confirmPaymentIntent)
stripeRouter.get('/session/get/:sessionId', retrieveSession)
stripeRouter.get('/paymentIntent/:paymentIntentId', getPaymentIntent)
stripeRouter.get('/retrieve/payments', cacheMiddleware(240), retrievePayments)

export default stripeRouter
