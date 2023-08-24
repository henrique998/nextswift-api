import { Router } from 'express'
import { AddCustomerController } from '../controllers/customers/AddCustomerController'
import { GetAllCustomersController } from '../controllers/customers/GetAllCustomersController'
import { GetManyCustomersController } from '../controllers/customers/GetManyCustomersController'
import { GetOneCustomerByIdController } from '../controllers/customers/GetOneCustomerByIdController'
import { RemoveCustomerController } from '../controllers/customers/RemoveCustomerController'
import { UpdateCustomerInfoController } from '../controllers/customers/UpdateCustomerInfoController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/permissions'

const customerRoute = Router()

const getAllCustomersController = new GetAllCustomersController()
const getManyCustomersController = new GetManyCustomersController()
const getOneCustomerByIdController = new GetOneCustomerByIdController()
const addCustomerController = new AddCustomerController()
const removeCustomerController = new RemoveCustomerController()
const updateCustomerInfoController = new UpdateCustomerInfoController()

customerRoute.get('/', ensureAuthenticated, getAllCustomersController.handle)

customerRoute.get(
  '/search',
  ensureAuthenticated,
  getManyCustomersController.handle,
)

customerRoute.get(
  '/get-by-id/:customerId',
  ensureAuthenticated,
  getOneCustomerByIdController.handle,
)

customerRoute.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  addCustomerController.handle,
)

customerRoute.delete(
  '/remove/:customerId',
  ensureAuthenticated,
  is(['admin']),
  removeCustomerController.handle,
)

customerRoute.put(
  '/update/:customerId',
  ensureAuthenticated,
  is(['admin']),
  updateCustomerInfoController.handle,
)

export { customerRoute as customersRoutes }
