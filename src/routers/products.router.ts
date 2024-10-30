import { Router } from 'express'
import { uploadProductsController } from '../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)

export default productsRouter
