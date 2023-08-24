import 'reflect-metadata'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import { ZodError } from 'zod'

import swaggerFile from './swagger.json'

import { resolve } from 'node:path'
import { AppError } from '../application/errors/AppError'
import { routes } from './http/routes'

const app = express()

app.use(express.json())

app.use('/images', express.static(resolve(__dirname, 'uploads')))
app.use(cors())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message })
  }

  return res.status(500).send(err.message)
})

export { app }
