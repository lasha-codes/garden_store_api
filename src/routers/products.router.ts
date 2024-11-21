import { Router } from 'express'
import {
  deleteProductsController,
  finishPurchaseController,
  getProductByIdController,
  retrieveProductsController,
  retrieveProductsInCartController,
  retrieveSliderController,
  uploadProductsController,
  uploadSliderProductController,
} from '../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)
productsRouter.post('/cart/get', retrieveProductsInCartController)
productsRouter.post('/slider/upload', uploadSliderProductController)
productsRouter.post('/finish/purchase', finishPurchaseController)
productsRouter.get('/retrieve', retrieveProductsController)
productsRouter.get('/get/:id', getProductByIdController)
productsRouter.get('/slider/get', retrieveSliderController)
productsRouter.delete('/delete', deleteProductsController)

export default productsRouter
