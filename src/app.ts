import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Controller } from './api/base/controller';
import {
  TodoAll,
  TodoCreate,
  TodoDelete,
  TodoDetail,
  TodoList,
  TodoModify,
  TodoMultiRemove,
  TodoToggle,
} from './api/todo/index';

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

router
  .get('/all-todos', Controller(TodoAll))
  .get('/todos', Controller(TodoList))
  .get('/todos/:ID', Controller(TodoDetail))
  .post('/todos', Controller(TodoCreate))
  .put('/todos/:ID', Controller(TodoModify))
  .put('/todos/toggle/:ID', Controller(TodoToggle))
  .delete('/todos/:ID', Controller(TodoDelete))
  .post('/todos/multiRemove', Controller(TodoMultiRemove))

  .get('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .post('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .put('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  .delete('*', (req, res) => res.status(404).send({ statusCode: 404, message: 'not found' }))
  ;

app.use('/', router);

export = app;
