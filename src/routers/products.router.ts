import { Router } from 'express'
import {
  deleteProductsController,
  getProductByIdController,
  retrieveProductsController,
  uploadProductsController,
} from '../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)
productsRouter.get('/retrieve', retrieveProductsController)
productsRouter.get('/get/:id', getProductByIdController)
productsRouter.delete('/delete', deleteProductsController)

export default productsRouter
