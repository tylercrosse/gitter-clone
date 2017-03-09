# Gitter-clone
[![Build Status](https://semaphoreci.com/api/v1/tcrosse/gitter-clone/branches/master/badge.svg)](https://semaphoreci.com/tcrosse/gitter-clone)
[![codecov](https://codecov.io/gh/tylercrosse/gitter-clone/branch/master/graph/badge.svg)](https://codecov.io/gh/tylercrosse/gitter-clone)

This is app was built as portfolio piece representing a subset of the features of Troupe Technology's wonderful chat app, [Gitter](https://gitter.im/). I'm currently looking for a new position - Hire me!

### Demo

You can test a fully working live demo at  http://138.68.24.248:3333/

### Major features

- Create Channels
- Send Messages to all subscribed clients on channel
- Load previous messages in channel
- MD / syntax highlighting support for messages
- Messages grouped into bursts

### Built with

<div align="center">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/react.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/redux.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/webpack.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/express.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/mongodb.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/jest.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/semaphor.svg">
  <img height="80" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/assets/src/client/assets/img/digitalocean.svg">
</div>

### Setup

If you don't have [yarn](https://yarnpkg.com/en/) commands can be run with `npm`. First, clone and cd into the repo and install the dependencies.

```sh
$ git clone https://github.com/tylercrosse/gitter-clone.git
$ cd gitter-clone
$ yarn install
```

Additional commands:
##### `yarn dev`
- Start development server on 127.0.0.1:3333

##### `yarn build`
- Build a production version of the app.

##### `yarn start`
- Start production server on 127.0.0.1:3333 to serve built app. Requires the build command to have already been run.

##### `yarn test`
- Run all of the projects tests using jest.

##### `yarn lint`
- Lint all of the projects javascript files using eslint.
