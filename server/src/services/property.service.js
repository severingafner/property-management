const httpStatus = require('http-status');
const Property = require('../models/property.model');
const ApiError = require('../utils/ApiError');

const createProperty = async (propertyBody) => {
  const property = await Property.create(propertyBody);
  return property;
};

const getPropertyById = async (id) => {
  return Property.findById(id);
};

const queryPropertys = async (filter, options) => {
  const property = await Property.paginate(filter, options);
  return property;
};

const updateProperty = async (property, updateBody) => {
  Object.assign(property, updateBody);
  await property.save();
  return property;
};

const updatePropertyById = async (id, updateBody) => {
  let property = await getPropertyById(id);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  property = await updateProperty(property, updateBody);
  return property;
};

const deletePropertyById = async (id) => {
  const property = await getPropertyById(id);
  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }
  await property.remove();
  return property;
};

module.exports = {
  queryPropertys,
  getPropertyById,
  createProperty,
  updatePropertyById,
  deletePropertyById,
};
