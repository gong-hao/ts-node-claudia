import * as express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send({
    title: 'Express woo'
  });
});

export = router;
