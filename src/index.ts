import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.router.js'
import { errorHandler } from './middlewares/error.handler.js'
import productsRouter from './routers/products.router.js'
import stripeRouter from './routers/stripe.router.js'

const app = express()
dotenv.config()

const PORT: number = Number(process.env.PORT) || 4000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
)

app.use(errorHandler)

app.use('/auth', authRouter)
app.use('/products', productsRouter)
app.use('/stripe', stripeRouter)

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
