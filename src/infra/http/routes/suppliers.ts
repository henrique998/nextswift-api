import { Router } from 'express'
import { AddSupplierController } from '../controllers/suppliers/AddSupplierController'
import { GetManySuppliersController } from '../controllers/suppliers/GetManySuppliersController'
import { GetSupplierByIdController } from '../controllers/suppliers/GetSupplierByIdController'
import { RemoveSupplierController } from '../controllers/suppliers/RemoveSupplierController'
import { UpdateSupplierInfoController } from '../controllers/suppliers/UpdateSupplierInfoController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/permissions'

const supplierRoute = Router()

const getManySuppliersController = new GetManySuppliersController()
const getSupplierByIdController = new GetSupplierByIdController()
const addSupplierController = new AddSupplierController()
const removeSupplierController = new RemoveSupplierController()
const updateSupplierInfoController = new UpdateSupplierInfoController()

supplierRoute.get(
  '/search',
  ensureAuthenticated,
  getManySuppliersController.handle,
)

supplierRoute.get(
  '/get-by-id/:supplierId',
  ensureAuthenticated,
  getSupplierByIdController.handle,
)

supplierRoute.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  addSupplierController.handle,
)

supplierRoute.patch(
  '/remove',
  ensureAuthenticated,
  is(['admin']),
  removeSupplierController.handle,
)

supplierRoute.put(
  '/update/:supplierId',
  ensureAuthenticated,
  is(['admin']),
  updateSupplierInfoController.handle,
)

export { supplierRoute as suppliersRoutes }
