const httpStatus = require('http-status');
const Contract = require('../models/contract.model');
const ApiError = require('../utils/ApiError');

const createContract = async (contractBody) => {
  const contract = await Contract.create(contractBody);
  return contract;
};

const getContractById = async (id) => {
  return Contract.findById(id);
};

const queryContracts = async (filter, options) => {
  const contract = await Contract.paginate(filter, options);
  return contract;
};

const updateContract = async (contract, updateBody) => {
  Object.assign(contract, updateBody);
  await contract.save();
  return contract;
};

const updateContractById = async (id, updateBody) => {
  let contract = await getContractById(id);
  if (!contract) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contract not found');
  }
  contract = await updateContract(contract, updateBody);
  return contract;
};

const deleteContractById = async (id) => {
  const contract = await getContractById(id);
  if (!contract) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contract not found');
  }
  await contract.remove();
  return contract;
};

module.exports = {
  queryContracts,
  getContractById,
  createContract,
  updateContractById,
  deleteContractById,
};
