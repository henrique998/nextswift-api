import { Router } from 'express'
import { GetAllMetricsController } from '../controllers/metrics/GetAllMetricsController'
import { GetPurchasesMetricsController } from '../controllers/metrics/GetPurchasesMetricsController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const metricsRoute = Router()

const getAllMetricsController = new GetAllMetricsController()
const getPurchasesMetricsController = new GetPurchasesMetricsController()

metricsRoute.get('/all', ensureAuthenticated, getAllMetricsController.handle)
metricsRoute.get(
  '/sales',
  ensureAuthenticated,
  getPurchasesMetricsController.handle,
)

export { metricsRoute as metricsRoutes }
