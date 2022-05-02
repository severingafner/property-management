const express = require('express');
const contractController = require('../../controllers/contract.controller');

const router = express.Router();

router.route('/').post(contractController.createContract).get(contractController.getContracts);

router
  .route('/:contractId')
  .get(contractController.getContract)
  .patch(contractController.updateContract)
  .delete(contractController.deleteContract);

module.exports = router;
