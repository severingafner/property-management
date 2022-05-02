const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { contractService } = require('../services');

const createContract = catchAsync(async (req, res) => {
  const user = await contractService.createContract(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getContracts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await contractService.queryContracts(filter, options);
  res.send(result);
});

const getContract = catchAsync(async (req, res) => {
  const contract = await contractService.getContractById(req.params.contractId);
  if (!contract) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contract not found');
  }
  res.send(contract);
});

const updateContract = catchAsync(async (req, res) => {
  const contractOld = await contractService.getContractById(req.params.contractId);
  if (!contractOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contract not found');
  }
  const contract = {
    ...contractOld,
    ...req.body,
  };
  await contractService.updateContractById(contractOld.id, contract);
  res.send(contract);
});

const deleteContract = catchAsync(async (req, res) => {
  const contract = await contractService.getContractById(req.params.contractId);
  if (!contract) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contract not found');
  }
  await contractService.deleteContractById(req.params.contractId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createContract,
  getContracts,
  getContract,
  updateContract,
  deleteContract,
};
