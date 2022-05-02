const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const billRoute = require('./bill.route');
const personRoute = require('./person.route');
const creditorRoute = require('./creditor.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bill',
    route: billRoute,
  },
  {
    path: '/person',
    route: personRoute,
  },
  {
    path: '/creditor',
    route: creditorRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
