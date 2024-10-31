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
    const products = await prisma.product.findMany()
    return products
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}
