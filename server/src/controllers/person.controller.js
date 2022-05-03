const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { personService } = require('../services');

const createPerson = catchAsync(async (req, res) => {
  const user = await personService.createPerson(req.body.data);
  res.status(httpStatus.CREATED).send(user);
});

const getPeople = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'prename']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await personService.queryPeople(filter, options);
  res.send(result);
});

const getPerson = catchAsync(async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
  }
  res.send(person);
});

const updatePerson = catchAsync(async (req, res) => {
  const personOld = await personService.getPersonById(req.params.personId);
  if (!personOld) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
  }
  const person = {
    ...personOld,
    ...req.body,
  };
  await personService.updatePersonById(personOld.id, person);
  res.send(person);
});

const deletePerson = catchAsync(async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Person not found');
  }
  await personService.deletePersonById(req.params.personId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
