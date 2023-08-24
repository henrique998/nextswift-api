import { Router } from 'express'
import { RefreshTokenController } from '../controllers/session/RefreshTokenController'
import { SessionController } from '../controllers/session/SessionController'

const sessionRoute = Router()

const sessionController = new SessionController()
const refreshTokenController = new RefreshTokenController()

sessionRoute.post('/', sessionController.handle)
sessionRoute.post('/refresh-token', refreshTokenController.handle)

export { sessionRoute as sessionRoutes }
