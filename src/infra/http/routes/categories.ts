import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { is } from '../middlewares/permissions'

import { CreateCategoryController } from '../controllers/categories/CreateCategoryController'
import { DeleteCategoryController } from '../controllers/categories/DeleteCategoryController'
import { GetAllCategoriesController } from '../controllers/categories/GetAllCategoriesController'
import { SearchCategoriesController } from '../controllers/categories/SearchCategoriesController'

const categoriesRoute = Router()

const getAllCategoriesController = new GetAllCategoriesController()
const searchCategoriesController = new SearchCategoriesController()
const createCategoryController = new CreateCategoryController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoute.get('/', ensureAuthenticated, getAllCategoriesController.handle)

categoriesRoute.get(
  '/search',
  ensureAuthenticated,
  searchCategoriesController.handle,
)

categoriesRoute.post(
  '/',
  ensureAuthenticated,
  is(['admin']),
  createCategoryController.handle,
)

categoriesRoute.delete(
  '/delete/:categoryId',
  ensureAuthenticated,
  is(['admin']),
  deleteCategoryController.handle,
)

export { categoriesRoute as categoriesRoutes }
