import * as awsServerlessExpress from 'aws-serverless-express';

import * as app from './app';

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
