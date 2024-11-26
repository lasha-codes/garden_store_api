import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const uploadRouter = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1

    const finalMonth = month >= 10 ? month : `${0}${month}`

    const uploadDir = path.join(
      __dirname.split('dist')[0],
      `/uploads/${year}-${finalMonth}`
    )

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    return cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage })

// @ts-ignore
uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const finalMonth = month >= 10 ? month : `${0}${month}`

  const folder_path = `uploads/${year}-${finalMonth}`

  const image_path = new URL(
    `${folder_path}/${req.file.filename}`,
    process.env.PUBLIC_URL
  )

  try {
    return res.status(200).json({
      image_path: image_path,
    })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
})

export default uploadRouter
