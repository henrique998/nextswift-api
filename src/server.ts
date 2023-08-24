import { app } from './infra/app'
import { env } from './infra/env'

app.listen(env.PORT, () =>
  console.log(`🚀 Server is running at: http://localhost:${env.PORT}`),
)
