import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
  })
)
