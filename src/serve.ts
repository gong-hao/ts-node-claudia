import * as cors from 'cors'
import * as fs from 'fs'

import app from './app'

if (fs.existsSync('env.json')) {
  const config = JSON.parse(fs.readFileSync('env.json', 'utf8'))
  Object.keys(config).forEach(name => process.env[name] = config[name])
}

process.env.mode = 'dev'

const port = process.env.PORT || 3000

const _app = app(app => app.use(cors()))

_app.listen(port)
