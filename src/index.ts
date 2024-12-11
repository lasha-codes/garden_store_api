import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.handler.js'
import productsRouter from './routers/products.router.js'
import stripeRouter from './routers/stripe.router.js'
import emailRouter from './routers/nodemailer.router.js'
import usersRouter from './routers/users.router.js'
import uploadRouter from './routers/upload.router.js'
import tbcRouter from './routers/banks/tbc.router.js'

const app = express()
dotenv.config()

const PORT: number = Number(process.env.PORT) || 4000

app.set('trust proxy', true)
app.use('/uploads', express.static('uploads'))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
)

app.use(errorHandler)

app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/stripe', stripeRouter)
app.use('/email', emailRouter)
app.use('/files', uploadRouter)
app.use('/banks/tbc', tbcRouter)

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
