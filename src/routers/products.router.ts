import { Router } from 'express'
import {
  retrieveProductsController,
  uploadProductsController,
} from '../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)
productsRouter.get('/retrieve', retrieveProductsController)

export default productsRouter
