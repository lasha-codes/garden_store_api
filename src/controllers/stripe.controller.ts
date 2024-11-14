import { Product } from '@prisma/client'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY)

export const createPaymentIntent: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { products } = req.body

    const lineItems = products.map((product: Product) => ({
      price_data: {
        currency: 'gel',
        product_data: {
          name: product.geo_title,
          description: product.geo_description,
        },
        unit_amount: product.price,
      },
      quantity: product.qty || 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.STRIPE_SUCCESS_URL}`,
      cancel_url: process.env.ORIGIN,
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating Checkout Session:', error)
    res.status(500).send({ error: error.message })
  }
}
