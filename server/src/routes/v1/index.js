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
    path: '/bills',
    route: billRoute,
  },
  {
    path: '/contracts',
    route: contractRoute,
  },
  {
    path: '/creditors',
    route: creditorRoute,
  },
  {
    path: '/people',
    route: personRoute,
  },
  {
    path: '/properties',
    route: propertyRoute,
  },
  {
    path: '/rentObjects',
    route: rentObjectRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
