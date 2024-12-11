import { NextFunction, Request, RequestHandler, Response } from 'express'
import { initiatePaymentService } from '../../services/banks/tbc.service.js'

export const initiatePaymentController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, products, metadata } = req.body
    if (!amount || !Number.isInteger(amount)) {
      res.status(400).json({ message: 'Invalid amount provided.' })
    } else if (!products) {
      res.status(400).json({ message: 'purchased products info is required' })
    } else if (!metadata) {
      res.status(400).json({ message: 'metadata is required' })
    } else {
      const paymentData = await initiatePaymentService(
        amount,
        products,
        metadata
      )
      res.status(200).json({ paymentData })
    }
  } catch (err) {
    next(err)
  }
}
