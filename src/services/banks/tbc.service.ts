import axios from 'axios'
import CustomError from '../../utils/customError.js'

const ORIGIN = process.env.ORIGIN

const tbcApiInstance = axios.create({
  baseURL: 'https://test-api.tbcbank.ge/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    apiKey: process.env.TBC_API_KEY,
  },
})

export const initiatePaymentService = async (
  amount: number,
  items: { price: number; qty: number; geo_title: string }[],
  metadata: any
) => {
  try {
    console.log(amount, items, metadata)
    const response = await tbcApiInstance.post('/tpay/payments', {
      amount,
      currency: 'GEL',
      redirectUrl: `${ORIGIN}/payment_success`,
      failUrl: `${ORIGIN}/payment_failed`,
      metadata: {
        products: items.map((item) => ({
          total: item.price * item.qty,
          price: item.price,
          qty: item.qty,
          product: item.geo_title,
        })),
        ...metadata,
      },
    })

    console.log('Payment initiation response:', response.data)

    return response.data
  } catch (error) {
    if (error.response) {
      console.log('Response headers:', error.response.headers)
      console.log('Response status:', error.response.status)
      console.log('Response body:', error.response.data)
    }

    throw new CustomError(error, null, 500)
  }
}
