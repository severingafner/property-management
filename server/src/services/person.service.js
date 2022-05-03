const httpStatus = require('http-status');
const { Person } = require('../models');
const ApiError = require('../utils/ApiError');

const createPerson = async (personBody) => {
  const person = await Person.create(personBody);
  return person;
};

const getPersonById = async (id) => {
  return Person.findById(id);
};

const queryPeople = async (filter, options) => {
  const person = await Person.paginate(filter, options);
  return person;
};

const updatePerson = async (person, updateBody) => {
  Object.assign(person, updateBody);
  await person.save();
  return person;
};

const updatePersonById = async (id, updateBody) => {
  let person = await getPersonById(id);
  if (!person) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
  }
  person = await updatePerson(person, updateBody);
  return person;
};

const deletePersonById = async (id) => {
  const person = await getPersonById(id);
  if (!person) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
  }
  await person.remove();
  return person;
};

module.exports = {
  queryPeople,
  getPersonById,
  createPerson,
  updatePersonById,
  deletePersonById,
};
