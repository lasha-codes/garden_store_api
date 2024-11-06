import { Product } from '@prisma/client'
import CustomError from '../utils/customError.js'
import prisma from '../database/prisma.js'

export const uploadProductsService = async (productsToUpload: Product[]) => {
  try {
    const products = await prisma.product.createMany({
      data: productsToUpload,
      skipDuplicates: true,
    })

    return products
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}

export const retrieveProductsService = async () => {
  try {
    const products = await prisma.product.findMany({ take: 20 })
    return products
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}

export const getProductByIdService = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } })
    return product
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}

export const retrieveProductsInCart = async (
  products: { id: string; qty: number }[]
) => {
  try {
    const productIds = products.map((product) => product.id)

    const cart = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    })

    const cartWithQuantities = cart.map((product) => {
      const matchingProduct = products.find((p) => p.id === product.id)
      return {
        ...product,
        qty: matchingProduct ? matchingProduct.qty : 1,
      }
    })

    return cartWithQuantities
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}
