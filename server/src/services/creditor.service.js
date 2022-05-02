const httpStatus = require('http-status');
const Creditor = require('../models/creditor.model');
const ApiError = require('../utils/ApiError');

const createCreditor = async (creditorBody) => {
  const creditor = await Creditor.create(creditorBody);
  return creditor;
};

const getCreditorById = async (id) => {
  return Creditor.findById(id);
};

const queryCreditors = async (filter, options) => {
  const creditor = await Creditor.paginate(filter, options);
  return creditor;
};

const updateCreditor = async (creditor, updateBody) => {
  Object.assign(creditor, updateBody);
  await creditor.save();
  return creditor;
};

const updateCreditorById = async (id, updateBody) => {
  let creditor = await getCreditorById(id);
  if (!creditor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creditor not found');
  }
  creditor = await updateCreditor(creditor, updateBody);
  return creditor;
};

const deleteCreditorById = async (id) => {
  const creditor = await getCreditorById(id);
  if (!creditor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Creditor not found');
  }
  await creditor.remove();
  return creditor;
};

module.exports = {
  queryCreditors,
  getCreditorById,
  createCreditor,
  updateCreditorById,
  deleteCreditorById,
};
