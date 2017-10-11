# ts-node-claudia

This is an example project to demonstrate how to make a serverless application with [`Node.js`](https://nodejs.org/en/), [`TypeScript`](https://www.typescriptlang.org/), and [`Claudia.js`](https://github.com/claudiajs/claudia) on [`Amazon Web Services (AWS)`](https://aws.amazon.com/).

## Install dependencies

Run `npm i` to install dependencies.

## Install global packages

Run `npm run glob` to install [`typescript`](https://www.typescriptlang.org/), [`ts-node`](https://github.com/TypeStrong/ts-node), [`nodemon`](https://github.com/remy/nodemon), and [`claudia`](https://github.com/claudiajs/claudia). Those are all required for this project.

## Environment variables

`env.json` is using for setting environment variables (.gitignore ignores this file to protact you ).

By default, the project uses conn variable to link [`MongoDB`](https://www.mongodb.com/).

`Development server` will load it in `serve.ts`, and [`Claudia.js`](https://github.com/claudiajs/claudia) also use it to set environment variables on [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

```
{
  "conn": "mongodb://{username}:{password}@ds123456.mlab.com:45678/{dbname}"
}
```

## Development server

Run `npm run dev` for a dev server. It uses [`nodemon`](https://github.com/remy/nodemon) to watch files and uses [`ts-node`](https://github.com/TypeStrong/ts-node) to run .ts code.

## AWS settings

Your `IAM user` will need to access at least [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html), [`API Gateway`](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html), and [`IAM`](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) in order to run [`Claudia.js`](https://github.com/claudiajs/claudia).

Add the keys to your `.aws/credentials` file
```
[claudia]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_ACCESS_SECRET
```

> See more detail in [INSTALLING AND CONFIGURING CLAUDIA.JS](https://claudiajs.com/tutorials/installing.html#configuring-access-credentials)

## Deploy stepts

1. Run `npm run build` to compile .ts to .js into `dist folder`. It will also copy package.json into `dist folder` in order to run [`Claudia.js`](https://github.com/claudiajs/claudia).

2. Run `npm run create` to initialize [`Claudia.js`](https://github.com/claudiajs/claudia). [`Claudia.js`](https://github.com/claudiajs/claudia) will install packages, zip files, upload to [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html), setup [`API Gateway`](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html).

3. Run `npm run update` to update api if you have done `npm run create` before. Be careful to keep claudia.json into `dist folder`. Claudia will generate it after creating api, and use it for update api.

   > See more detail in  [Claudia.js documentation](https://github.com/claudiajs/claudia/tree/master/docs)
