import { Product } from '@prisma/client'
import CustomError from '../utils/customError'
import prisma from '../database/db'

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
