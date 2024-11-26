import { clerkClient } from '@clerk/express'
import CustomError from '../utils/customError.js'

export const retrieveUsersService = async () => {
  try {
    const users = await clerkClient.users.getUserList()
    return users
  } catch (err) {
    throw new CustomError(err, 'Something went wrong', 500)
  }
}
