import * as app from './app';

process.env.mode = 'dev';

const port = process.env.PORT || 3000;

app.listen(port);
