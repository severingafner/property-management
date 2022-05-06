const express = require('express');
const propertyController = require('../../controllers/property.controller');
const rentObjectController = require('../../controllers/rentobject.controller');

const router = express.Router();

router.route('/').post(propertyController.createProperty).get(propertyController.getPropertys);

router
  .route('/:propertyId')
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .post(rentObjectController.createRentObject)
  .delete(propertyController.deleteProperty);

router
  .route('/:propertyId/rentObject/:rentObjectId')
  .get(rentObjectController.getRentObject)
  .delete(rentObjectController.deleteRentObject);

module.exports = router;
