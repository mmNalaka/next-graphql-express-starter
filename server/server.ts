import dotenv from 'dotenv'
dotenv.config()

import next from 'next'
import express from 'express'
import session from 'express-session'
import { ApolloServer } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'

import schema from './graphql/schema'
import { createContent } from './graphql/context'
import { permissions } from './middlewares/permissions.mw'

import { config } from '../config/app-config'
import { passport, passportUtils } from './libs/passport.lib'

const PORT = parseInt(process.env.PORT || '3000', 10)
const DEV = process.env.NODE_ENV !== 'production'

const server = next({ dev: DEV })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()

  const schemaWithMiddlewares = applyMiddleware(schema, permissions)
  const graphqlServer = new ApolloServer({
    schema: schemaWithMiddlewares,
    context: createContent,
  })

  app.use(session(config.sessionConfig))
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/auth/google', passportUtils.initGoogleAuth())
  app.get('/auth/google/callback', passportUtils.handleGoogleAuthCallback())

  // initialize graphql server
  graphqlServer.applyMiddleware({ app, path: '/api/graphql' })

  // Pass the rest to the NextJs server
  app.all('*', (req, res) => {
    return handle(req, res as any)
  })

  app.listen(PORT, () => {
    console.info(`Server listening one ${config.BASE_URL} 🚀`)
  })
})
