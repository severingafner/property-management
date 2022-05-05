const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { creditorService } = require('../services');

const createCreditor = catchAsync(async (req, res) => {
  const user = await creditorService.createCreditor(req.body.data);
  res.status(httpStatus.CREATED).send(user);
});

const getCreditors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await creditorService.queryCreditors(filter, options);
  res.send(result);
});

const getCreditor = catchAsync(async (req, res) => {
  const creditor = await creditorService.getCreditorById(req.params.creditorId);
  if (!creditor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creditor not found');
  }
  res.send(creditor);
});

const updateCreditor = catchAsync(async (req, res) => {
  const creditorOld = await creditorService.getCreditorById(req.params.creditorId);
  if (!creditorOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creditor not found');
  }
  const creditor = {
    ...creditorOld,
    ...req.body,
  };
  await creditorService.updateCreditorById(creditorOld.id, creditor);
  res.send(creditor);
});

const deleteCreditor = catchAsync(async (req, res) => {
  const creditor = await creditorService.getCreditorById(req.params.creditorId);
  if (!creditor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creditor not found');
  }
  await creditorService.deleteCreditorById(req.params.creditorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCreditor,
  getCreditors,
  getCreditor,
  updateCreditor,
  deleteCreditor,
};
