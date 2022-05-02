const express = require('express');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const billRoute = require('./bill.route');
const contractRoute = require('./contract.route');
const creditorRoute = require('./creditor.route');
const personRoute = require('./person.route');
const propertyRoute = require('./property.route');
const rentObjectRoute = require('./rentObject.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/bill',
    route: billRoute,
  },
  {
    path: '/contract',
    route: contractRoute,
  },
  {
    path: '/creditor',
    route: creditorRoute,
  },
  {
    path: '/person',
    route: personRoute,
  },
  {
    path: '/property',
    route: propertyRoute,
  },
  {
    path: '/rentObject',
    route: rentObjectRoute,
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
