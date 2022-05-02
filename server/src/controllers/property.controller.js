const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { propertyService } = require('../services');

const createProperty = catchAsync(async (req, res) => {
  const user = await propertyService.createProperty(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getPropertys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await propertyService.queryPropertys(filter, options);
  res.send(result);
});

const getProperty = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  res.send(property);
});

const updateProperty = catchAsync(async (req, res) => {
  const propertyOld = await propertyService.getPropertyById(req.params.propertyId);
  if (!propertyOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  const property = {
    ...propertyOld,
    ...req.body,
  };
  await propertyService.updatePropertyById(propertyOld.id, property);
  res.send(property);
});

const deleteProperty = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await propertyService.deletePropertyById(req.params.propertyId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProperty,
  getPropertys,
  getProperty,
  updateProperty,
  deleteProperty,
};
