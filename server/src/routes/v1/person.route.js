const express = require('express');
const validate = require('../../middlewares/validate');
const personValidation = require('../../validations/person.validation');
const personController = require('../../controllers/person.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(personValidation.createPerson), personController.createPerson)
  .get(personController.getPeople);

router
  .route('/:personId')
  .get(personController.getPerson)
  .patch(personController.updatePerson)
  .delete(personController.deletePerson);

module.exports = router;
