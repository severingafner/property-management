const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { rentObjectService } = require('../services');

const createRentObject = catchAsync(async (req, res) => {
  const user = await rentObjectService.createRentObject(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getRentObjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rentObjectService.queryRentObjects(filter, options);
  res.send(result);
});

const getRentObject = catchAsync(async (req, res) => {
  const rentObject = await rentObjectService.getRentObjectById(req.params.rentObjectId);
  if (!rentObject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RentObject not found');
  }
  res.send(rentObject);
});

const updateRentObject = catchAsync(async (req, res) => {
  const rentObjectOld = await rentObjectService.getRentObjectById(req.params.rentObjectId);
  if (!rentObjectOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RentObject not found');
  }
  const rentObject = {
    ...rentObjectOld,
    ...req.body,
  };
  await rentObjectService.updateRentObjectById(rentObjectOld.id, rentObject);
  res.send(rentObject);
});

const deleteRentObject = catchAsync(async (req, res) => {
  const rentObject = await rentObjectService.getRentObjectById(req.params.rentObjectId);
  if (!rentObject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RentObject not found');
  }
  await rentObjectService.deleteRentObjectById(req.params.rentObjectId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRentObject,
  getRentObjects,
  getRentObject,
  updateRentObject,
  deleteRentObject,
};
