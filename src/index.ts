import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.router.js'
import { errorHandler } from './middlewares/error.handler.js'

const PORT = process.env.PORT || 4000

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
  })
)

app.use(errorHandler)

app.use('/auth', authRouter)

app.listen(() => {
  console.log(`server is running on http://localhost:${PORT}`)
})
