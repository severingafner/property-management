const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { rentObjectService, propertyService } = require('../services');

const createRentObject = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  const rentObject = await rentObjectService.createRentObject(property, req.body.data);
  res.status(httpStatus.CREATED).send(rentObject);
});

const getRentObject = catchAsync(async (req, res) => {
  res.send({});
});

const deleteRentObject = catchAsync(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.propertyId);
  property.rentObjects.id(req.params.rentObjectId).remove();
  property.save();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getRentObject,
  createRentObject,
  deleteRentObject,
};
