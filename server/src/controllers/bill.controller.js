const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { billService } = require('../services');

const createBill = catchAsync(async (req, res) => {
  const user = await billService.createBill(req.body.data);
  res.status(httpStatus.CREATED).send(user);
});

const getBills = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await billService.queryBills(filter, options);
  res.send(result);
});

const getBill = catchAsync(async (req, res) => {
  const bill = await billService.getBillById(req.params.billId);
  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  res.send(bill);
});

const updateBill = catchAsync(async (req, res) => {
  const billOld = await billService.getBillById(req.params.billId);
  if (!billOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  const bill = {
    ...billOld,
    ...req.body,
  };
  await billService.updateBillById(billOld.id, bill);
  res.send(bill);
});

const deleteBill = catchAsync(async (req, res) => {
  const bill = await billService.getBillById(req.params.billId);
  if (!bill) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bill not found');
  }
  await billService.deleteBillById(req.params.billId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBill,
  getBills,
  getBill,
  updateBill,
  deleteBill,
};
