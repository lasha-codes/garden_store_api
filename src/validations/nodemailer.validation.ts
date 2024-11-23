import Joi from 'joi'
import CustomError from '../utils/customError.js'

export const validateContactSchema = (schema: any) => {
  try {
    const validateSchema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
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
