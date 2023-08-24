import { Router } from 'express'
import multer from 'multer'

import { UploaderConfig, UploaderExcellConfig } from '@infra/config/multer'

import { AddProductController } from '../controllers/products/AddProductController'

import { GetProductImagesController } from '../controllers/products/GetProductImagesController'
import { ImportProductController } from '../controllers/products/ImportProductController'
import { RemoveProductController } from '../controllers/products/RemoveProductController'
import { RemoveProductImagesController } from '../controllers/products/RemoveProductImagesController'
import { UpdateProductController } from '../controllers/products/UpdateProductController'
import { UploadProductImagesController } from '../controllers/products/UploadProductImagesController'

import { AddCategoriesToProductController } from '../controllers/products/AddCategoyToProductController'
import { GetAllProductsController } from '../controllers/products/GetAllProductsController'
import { GetManyProductsByCategoryController } from '../controllers/products/GetManyProductsByCategoryController'
import { GetManyProductsBySearchController } from '../controllers/products/GetManyProductsBySearchController'
import { GetManyProductsBySearchWithDateController } from '../controllers/products/GetManyProductsBySearchWithDateController'
import { GetManyProductsController } from '../controllers/products/GetManyProductsController'
import { GetManyRemovedProductsController } from '../controllers/products/GetManyRemovedProductsController'
import { RestoreProductController } from '../controllers/products/RestoreProductController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/permissions'

const productsRoute = Router()
const uploader = multer(UploaderConfig.execute('product'))
const excellUploader = multer(UploaderExcellConfig.execute('excell'))

const addProductController = new AddProductController()
const removeProductController = new RemoveProductController()
const updateProductController = new UpdateProductController()
const uploadProductImagesController = new UploadProductImagesController()
const removeProductImagesController = new RemoveProductImagesController()
const importProductController = new ImportProductController()
const addCategoriesToProductController = new AddCategoriesToProductController()
const restoreProductController = new RestoreProductController()
const getManyProductsController = new GetManyProductsController()

const getManyProductsByCategoryController =
  new GetManyProductsByCategoryController()

const getManyProductsBySearchController =
  new GetManyProductsBySearchController()

const getManyProductsBySearchWithDateController =
  new GetManyProductsBySearchWithDateController()

const getManyRemovedProductsController = new GetManyRemovedProductsController()

const getAllProductsController = new GetAllProductsController()
const getProductImagesController = new GetProductImagesController()

productsRoute.get('/', ensureAuthenticated, getAllProductsController.handle)

productsRoute.get(
  '/get-many',
  ensureAuthenticated,
  getManyProductsController.handle,
)

productsRoute.get(
  '/get-by-id/:productId',
  ensureAuthenticated,
  getAllProductsController.handle,
)

productsRoute.get(
  '/get-many-by-category',
  ensureAuthenticated,
  getManyProductsByCategoryController.handle,
)

productsRoute.get(
  '/search',
  ensureAuthenticated,
  getManyProductsBySearchController.handle,
)

productsRoute.get(
  '/search/get-many-by-dates',
  ensureAuthenticated,
  getManyProductsBySearchWithDateController.handle,
)

productsRoute.get(
  '/removed',
  ensureAuthenticated,
  getManyRemovedProductsController.handle,
)

productsRoute.get(
  '/:productId/images/get',
  ensureAuthenticated,
  is(['admin', 'sub-admin']),
  getProductImagesController.handle,
)

productsRoute.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  uploader.array('image'),
  addProductController.handle,
)

productsRoute.post(
  '/:productId/images/upload',
  ensureAuthenticated,
  is(['admin', 'sub-admin']),
  uploader.array('image'),
  uploadProductImagesController.handle,
)

productsRoute.post(
  '/import',
  ensureAuthenticated,
  is(['admin', 'sub-admin']),
  excellUploader.single('products-file'),
  importProductController.handle,
)

productsRoute.post(
  '/:productId/add/categories',
  ensureAuthenticated,
  is(['admin']),
  addCategoriesToProductController.handle,
)

productsRoute.put(
  '/update/:productId',
  ensureAuthenticated,
  is(['admin']),
  updateProductController.handle,
)

productsRoute.patch(
  '/:productId/images/remove',
  ensureAuthenticated,
  is(['admin']),
  removeProductImagesController.handle,
)

productsRoute.patch(
  '/:productId/restore',
  ensureAuthenticated,
  is(['admin']),
  restoreProductController.handle,
)

productsRoute.delete(
  '/remove/:productId',
  ensureAuthenticated,
  is(['admin']),
  removeProductController.handle,
)

export { productsRoute as productsRoutes }
