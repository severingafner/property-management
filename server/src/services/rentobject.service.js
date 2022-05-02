const httpStatus = require('http-status');
const RentObject = require('../models/rentobject.model');
const ApiError = require('../utils/ApiError');

const createRentObject = async (rentObjectBody) => {
  const rentObject = await RentObject.create(rentObjectBody);
  return rentObject;
};

const getRentObjectById = async (id) => {
  return RentObject.findById(id);
};

const queryRentObjects = async (filter, options) => {
  const rentObject = await RentObject.paginate(filter, options);
  return rentObject;
};

const updateRentObject = async (rentObject, updateBody) => {
  Object.assign(rentObject, updateBody);
  await rentObject.save();
  return rentObject;
};

const updateRentObjectById = async (id, updateBody) => {
  let rentObject = await getRentObjectById(id);
  if (!rentObject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RentObject not found');
  }
  rentObject = await updateRentObject(rentObject, updateBody);
  return rentObject;
};

const deleteRentObjectById = async (id) => {
  const rentObject = await getRentObjectById(id);
  if (!rentObject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RentObject not found');
  }
  await rentObject.remove();
  return rentObject;
};

module.exports = {
  queryRentObjects,
  getRentObjectById,
  createRentObject,
  updateRentObjectById,
  deleteRentObjectById,
};
