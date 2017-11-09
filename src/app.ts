import * as bodyParser from 'body-parser'
import * as express from 'express'

import notFound from './router/not-found'
import todo from './router/todo'

export default (action?): any => {
  const app = express()

  if (action) {
    action(app)
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use('/', todo)
  app.use('/', notFound)

  return app
}
