import * as express from 'express'

const router = express.Router()

router
  .all('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'api not found' }))

export default router
