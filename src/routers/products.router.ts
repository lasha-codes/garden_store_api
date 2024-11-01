import { Router } from 'express'
import {
  getProductByIdController,
  retrieveProductsController,
  uploadProductsController,
} from '../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)
productsRouter.get('/retrieve', retrieveProductsController)
productsRouter.get('/get/:id', getProductByIdController)

export default productsRouter
