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

export const uploadSliderProduct = async (productId: string) => {
  try {
    const sliderLength = await prisma.sliderProduct.count()
    if (sliderLength === 4) {
      return { error: 'maximum slider length reached', sliderProduct: null }
    } else {
      const sliderProduct = await prisma.sliderProduct.create({
        data: {
          product: {
            connect: {
              id: productId,
            },
          },
        },
        include: {
          product: true,
        },
      })

      return { error: null, sliderProduct }
    }
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}

export const retrieveSliderProductsService = async () => {
  try {
    const slider = await prisma.sliderProduct.findMany({
      take: 4,
      include: {
        product: {
          select: {
            images: true,
          },
        },
      },
    })

    return slider
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}

export const finishPurchaseService = async (cart: Product[]) => {
  try {
    let updatedProducts = []
    await prisma.$transaction(async (prisma) => {
      cart.forEach(async (product) => {
        const { id, qty: purchasedQty } = product

        const currProduct = await prisma.product.findUnique({
          where: {
            id: id,
          },
        })

        if (!currProduct) {
          throw new CustomError(null, 'no product found with provided id', 400)
        }

        if (currProduct.qty < purchasedQty) {
          throw new CustomError(
            null,
            'Insufficient quantity for the product' + '' + currProduct.id,
            400
          )
        }

        const updatedQty = currProduct.qty - purchasedQty

        const updatedProduct = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            qty: updatedQty,
          },
        })
        updatedProducts.push({ ...updatedProduct })
      })
    })

    return updatedProducts
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}
