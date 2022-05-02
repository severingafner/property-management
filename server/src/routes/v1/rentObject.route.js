const express = require('express');
const rentObjectController = require('../../controllers/rentobject.controller');

const router = express.Router();

router.route('/').post(rentObjectController.createRentObject).get(rentObjectController.getRentObjects);

router
  .route('/:rentObjectId')
  .get(rentObjectController.getRentObject)
  .patch(rentObjectController.updateRentObject)
  .delete(rentObjectController.deleteRentObject);

module.exports = router;
