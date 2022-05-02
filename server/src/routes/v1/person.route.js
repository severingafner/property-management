const express = require('express');
const validate = require('../../middlewares/validate');
const personValidation = require('../../validations/person.validation');
const personController = require('../../controllers/person.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(personValidation.createPerson), personController.createPerson)
  .get(personController.getPersons);

router
  .route('/:personId')
  .get(personValidation.getPerson)
  .patch(personValidation.updatePerson)
  .delete(personValidation.deletePerson);

module.exports = router;
