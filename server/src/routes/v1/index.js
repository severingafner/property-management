const express = require('express');
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

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
