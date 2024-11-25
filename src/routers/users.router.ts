import { Router } from 'express'
import { retrieveUsersController } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/retrieve', retrieveUsersController)

export default usersRouter
