import { Router } from 'express'
import { createPaymentIntent } from '../controllers/stripe.controller.js'

const stripeRouter = Router()

stripeRouter.post('/create/payment/intent', createPaymentIntent)

export default stripeRouter
