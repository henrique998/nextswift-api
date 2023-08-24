import { Router } from 'express'
import { CreateRoleController } from '../controllers/roles/CreateRoleController'
import { GetAllRolesController } from '../controllers/roles/GetAllRolesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/permissions'

const roleRoute = Router()

const getAllRolesController = new GetAllRolesController()
const createRoleController = new CreateRoleController()

roleRoute.get(
  '/',
  ensureAuthenticated,
  is(['admin']),
  getAllRolesController.handle,
)

roleRoute.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  createRoleController.handle,
)

export { roleRoute as rolesRoutes }
