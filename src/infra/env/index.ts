import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.number().default(3333),
  JWT_SECRET_KEY: z.string(),
  JWT_REFRESH_SECRET_KEY: z.string(),
  TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  MAILTRAP_API_HOST: z.string(),
  MAILTRAP_API_PORT: z.string(),
  MAILTRAP_API_USER: z.string(),
  MAILTRAP_API_PASS: z.string(),
  AWS_BUCKET_REGION: z.string(),
  AWS_BUCKET: z.string(),
  FORGOT_MAIL_URL: z.string().default('http://localhost:3000/password?reset='),
  APP_BASE_URL: z.string().default('http://localhost:3000'),
  STORAGE_BASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables!')
}

export const env = _env.data
