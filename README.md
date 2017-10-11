# ts-node-claudia

This is an example project to demonstrate how to make a serverless application with node.js, typescript, and claudia.js on AWS.

## Install dependencies

Run `npm i` to install dependencies.

## Install global packages

Run `npm run glob` to install typescript, ts-node, nodemon, claudia. Those are all required for this project.

## Development server

Run `npm run dev` for a dev server. It uses nodemon to watch files and uses ts-node to run .ts code.

## Environment variables

`env.json` is using for setting environment variables. (.gitignore ignores this file)
By default, the project uses conn variable to link MongoDB.

```
{
  "conn": "mongodb://{username}:{password}@ds123456.mlab.com:45678/{dbname}"
}
```

## Deploy stepts

1. Run `npm run build` to build .ts to .js into /dist folder. It will also copy package.json into /dist folder in order to run claudia.

2. Run `npm run create` to initialize claudia. Claudia will install packages, zip files, upload to Lambda, setup API Gateway.

3. Run `npm run update` to update api if you have done `npm run create` before. Be careful to keep claudia.json into /dist folder. Claudia will generate it after creating api, and use it for update api.

 > See more detail in claudiajs documentation [https://github.com/claudiajs/claudia/tree/master/docs](https://github.com/claudiajs/claudia/tree/master/docs)
 
