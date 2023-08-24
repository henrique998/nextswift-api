import { Router } from 'express'

import { categoriesRoutes } from './categories'
import { customersRoutes } from './customers'
import { employeesRoutes } from './employees'
import { metricsRoutes } from './metrics'
import { productsRoutes } from './products'
import { purchasesRoutes } from './purchases'
import { rolesRoutes } from './roles'
import { sessionRoutes } from './session'
import { suppliersRoutes } from './suppliers'

const router = Router()

router.use('/employees', employeesRoutes)
router.use('/session', sessionRoutes)
router.use('/roles', rolesRoutes)
router.use('/customers', customersRoutes)
router.use('/suppliers', suppliersRoutes)
router.use('/products', productsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/purchases', purchasesRoutes)
router.use('/metrics', metricsRoutes)

export { router as routes }
