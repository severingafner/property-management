const express = require('express');
const billController = require('../../controllers/bill.controller');

const router = express.Router();

router.route('/').post(billController.createBill).get(billController.getBills);

router.route('/:billId').get(billController.getBill).patch(billController.updateBill).delete(billController.deleteBill);

module.exports = router;
