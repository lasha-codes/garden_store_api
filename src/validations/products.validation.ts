import Joi from 'joi'
import CustomError from '../utils/customError.js'

export const validateProductSchema = (schema: any) => {
  try {
    const validateSchema = Joi.object({
      id: Joi.string().uuid().optional(),
      images: Joi.array().items(Joi.string().uri()).required(),
      geo_title: Joi.string().required(),
      eng_title: Joi.string().required(),
      geo_description: Joi.string().required(),
      eng_description: Joi.string().required(),
      price: Joi.number().integer().min(0).required(),
      currency: Joi.string().optional(),
      color: Joi.string().optional(),
      qty: Joi.number().integer().min(0).required(),
      brand: Joi.string().optional(),
      material: Joi.string().optional(),
      model: Joi.string().optional(),
      size: Joi.string().optional(),
      weight: Joi.string().optional(),
      youtubeUrl: Joi.string().optional(),
      PDF: Joi.string().optional(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
    })

    const { error } = validateSchema.validate(schema)

    if (error) {
      return { error }
    } else {
      return { error: null }
    }
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}
