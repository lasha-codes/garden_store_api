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
          images: product.images,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qty || 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Tbilisi Delivery',
            type: 'fixed_amount',
            fixed_amount: { amount: 1000, currency: 'gel' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 3 },
            },
          },
        },
        {
          shipping_rate_data: {
            display_name: 'Regional Delivery',
            type: 'fixed_amount',
            fixed_amount: { amount: 2000, currency: 'gel' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 2 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.ORIGIN}/checkout`,
      shipping_address_collection: {
        allowed_countries: ['GE'],
      },
    })

    res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating Checkout Session:', error)
    res.status(500).send({ error: error.message })
  }
}

export const retrieveSession: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { sessionId } = req.params

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

    if (session.payment_status === 'paid') {
      res.status(200).json({ status: 'success', session, lineItems })
    } else {
      res.status(200).json({ status: 'failed', session, lineItems })
    }
  } catch (error) {
    console.error('Error retrieving session:', error)
    res.status(500).send({ error: error.message })
  }
}

export const createPendingIntent = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { products, metadata } = req.body
  try {
    const productDetails = products.map((product: Product) => ({
      name: product.geo_title.slice(0, 20),
      price: `${product.price} - gel`,
      qty: product.qty || 1,
    }))

    const amount = products.reduce((acc: number, product: Product) => {
      return acc + product.price * 100 * (product.qty || 1)
    }, 0)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gel',
      payment_method_types: ['card'],
      metadata: {
        ...metadata,
        products: JSON.stringify(productDetails),
      },
    })

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      success: true,
    })
  } catch (error) {
    console.error('Error creating pending intent:', error)
    res.status(500).send({ error: error.message })
  }
}
