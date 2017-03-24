# Gitter-clone
[![Build Status](https://semaphoreci.com/api/v1/tcrosse/gitter-clone/branches/master/badge.svg)](https://semaphoreci.com/tcrosse/gitter-clone)
[![codecov](https://codecov.io/gh/tylercrosse/gitter-clone/branch/master/graph/badge.svg)](https://codecov.io/gh/tylercrosse/gitter-clone)

<div align="center">
  <img src="https://media.giphy.com/media/xUA7aUL7DgmAmxPMPK/giphy.gif" alt="preview gif">
</div>

This is app was built as portfolio piece representing a subset of the features of Troupe Technology's wonderful chat app, [Gitter](https://gitter.im/). I'm currently looking for a new position - Hire me!

---
### Demo

You can test a fully working live demo at https://gitter-clone.tk/

---
### Major features

- MD / syntax highlighting support for messages
- Messages grouped into bursts
- Create Channels
- Load previous messages in channel
- Send Messages to all subscribed clients on channel

---
### Built with

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/react.svg"> [React](https://facebook.github.io/react/)

React makes it really easy to focus on the view in a declarative way. I like that it makes it easy to write composable, testable UI. Routing is handled by [react router](https://reacttraining.com/react-router/).

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/redux.svg"> [Redux](http://redux.js.org/)

Redux is where the fun is at. Maintain a flat minimal state, with dictionary of normalized objects. I use [reselect](https://github.com/reactjs/reselect) to compute derived data. [Redux devtools](https://github.com/zalmoxisus/redux-devtools-extension) are also great, I kept it enabled on production for anyone wanting to easily take a look at the app's state.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/webpack.svg"> [Webpack 2](https://webpack.js.org/)

Fantastic code bundler once you get past the learning curve. I use it for a number of things including: transpile ES2015+ javascript to ES5 with [Babel](https://babeljs.io/), compile [Sass](http://sass-lang.com/) into css, optimize assets, hot reload code, build minimized split production code, + more.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/express.svg"> [Express](https://expressjs.com/)

It's nice to have JS everywhere. Express is fast and minimal. The backend is pretty simple with a router, a few controllers, and basic db interactions. Logging handled by [winston](https://github.com/winstonjs/winston).

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/mongodb.svg"> [MongoDB](https://www.mongodb.com/)

This project doesn't currently require a ton of data persistence. MongoDB + [Mongoose](http://mongoosejs.com/) make it easy to quickly update the Schema. If the project continues to grow I will probably switch to a relational DB. Also Mongo is still trendy.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/jest.svg"> [Jest](http://facebook.github.io/jest/)

Unit tests run by Jest. If you haven't seen Jest recently, you should take another look. [Enzyme](https://github.com/airbnb/enzyme) is used for React support and [SuperTest](https://github.com/visionmedia/supertest) is used for HTTP assertions. [Enzyme-to-JSON](https://github.com/adriantoine/enzyme-to-json) is also great and worth checking out in conjunction with the other test utilities.

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/semaphor.svg"> [SemaphoreCI](https://semaphoreci.com/)

Continuous integration handled by the super fast SemaphoreCI. Passing merges to master are auto deployed with help from [pm2](http://pm2.keymetrics.io/).

##### <img height="20" src="https://cdn.rawgit.com/tylercrosse/gitter-clone/9c26fc47/src/client/assets/img/digitalocean.svg"> [Digital Ocean](https://www.digitalocean.com/)

Application hosted on Ubuntu Digital Ocean droplet. SSH is fun!

---
### Setup

If you don't have [yarn](https://yarnpkg.com/en/) commands can be run with `npm`. First, clone and cd into the repo and install the dependencies.

```sh
$ git clone https://github.com/tylercrosse/gitter-clone.git
$ cd gitter-clone
$ yarn install
```

Additional commands:
##### `yarn dev`
- Start development server on `127.0.0.1:3333`

##### `yarn build`
- Build a production version of the app.

##### `yarn start`
- Start production server on `127.0.0.1:3333` to serve built app. Requires the build command to have already been run.

##### `yarn test`
- Run all of the projects tests using jest.

##### `yarn lint`
- Lint all of the projects javascript files using eslint.

---
### Contributing

Thank you for your interest! Unfortunately, I'm not currently taking contributions.
