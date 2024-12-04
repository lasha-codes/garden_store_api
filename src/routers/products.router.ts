import { Router } from 'express'
import {
  deleteProductController,
  deleteProductsController,
  finishPurchaseController,
  getProductByIdController,
  retrieveProductsController,
  retrieveProductsInCartController,
  retrieveSliderController,
  updateProductController,
  uploadProductsController,
  uploadSliderProductController,
} from '../controllers/products.controller.js'
import cacheMiddleware from '../middlewares/cache.middleware.js'

const productsRouter = Router()

productsRouter.post('/upload', uploadProductsController)
productsRouter.post('/cart/get', retrieveProductsInCartController)
productsRouter.post('/slider/upload', uploadSliderProductController)
productsRouter.post('/finish/purchase', finishPurchaseController)
productsRouter.get(
  '/retrieve',
  cacheMiddleware(1800),
  retrieveProductsController
)
productsRouter.get('/get/:id', getProductByIdController)
productsRouter.get(
  '/slider/get',
  cacheMiddleware(3600),
  retrieveSliderController
)
productsRouter.delete('/delete', deleteProductsController)
productsRouter.delete('/delete/:productId', deleteProductController)
productsRouter.put('/update', updateProductController)

export default productsRouter
