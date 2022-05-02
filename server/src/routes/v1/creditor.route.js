const express = require('express');
const creditorController = require('../../controllers/creditor.controller');

const router = express.Router();

router.route('/').post(creditorController.createCreditor).get(creditorController.getCreditors);

router
  .route('/:creditorId')
  .get(creditorController.getCreditor)
  .patch(creditorController.updateCreditor)
  .delete(creditorController.deleteCreditor);

module.exports = router;
