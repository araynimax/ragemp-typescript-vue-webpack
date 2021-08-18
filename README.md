# ragemp-typescript-vue-webpack

This base uses webpack to bundle/transpile everything.
If you don't want to use typescript that wont be a problem! Just replace main.**ts** with main.**js** and you are all set!

All cefs are build separately. I put a example cef into src/cefs.

## requirements

You only need [NodeJS](https://nodejs.org/en/download/) which you've probally already installed

## installation

1. Clone this repo
2. Run `npm install`.
3. Change path of `SERVER_FILES` to your server-files folder and `PACKAGE_NAME` with whatever you want to call you server package in [webpack.config.js](https://github.com/araynimax/ragemp-typescript-webpack/blob/main/webpack.config.js#L7)

## How to

- run `npm run dev` to start builder in development mode
- run `npm run build` to run builder in production mode
