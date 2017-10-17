import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Controller } from './api/controller';
import { Todo } from './api/todo';

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

router
  .get('/all-todos', Controller(Todo.all))
  .get('/todos', Controller(Todo.list))
  .get('/todos/:ID', Controller(Todo.detail))
  .post('/todos', Controller(Todo.create))
  .put('/todos/:ID', Controller(Todo.modify))
  .put('/todos/toggle/:ID', Controller(Todo.toggle))
  .delete('/todos/:ID', Controller(Todo.remove))
  .post('/todos/multiRemove', Controller(Todo.multiRemove))

  .get('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .post('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .put('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .delete('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  ;

app.use('/', router);

export = app;
