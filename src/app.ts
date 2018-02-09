import * as bodyParser from 'body-parser'
import * as express from 'express'

import notFoundRouter from './router/not-found.router'
import todoRouter from './router/todo.router'

export default (action?): any => {
  const app = express()

  if (action) {
    action(app)
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(todoRouter)
  app.use(notFoundRouter)

  return app
}
