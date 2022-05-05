
import * as Yup from 'yup'
import React from "react"
import BaseForm from './Form'
import { personService } from '../../services'

function PersonForm({person, callback}) {

const fields = [
  {
    name: 'prename',
    validation: Yup.string().required('Prename is required')
  },
  {
    name: 'name',
    validation: Yup.string().required('Name is required')
  },
  {
    name: 'email',
    validation: Yup.string().email().required('Email is required'),
    type: 'email'
  },
  {
    name: 'iban',
    validation: Yup.string()
  },
  {
    name: 'street',
    validation: Yup.string().required('Street is required')
  },
  {
    name: 'housenumber',
    validation: Yup.string()
  },
  {
    name: 'zip',
    validation: Yup.string().required('Zip is required')
  },
  {
    name: 'city',
    validation: Yup.string().required('City is required')
  }
]

const getFormFields = () => fields.map(field => {
  field.default = (person && person[field.name]) || '';
  return field;
});

const submitCb = async (data) => {
  if(person) {
    await personService.updatePerson({
      ...person,
      ...data
    });
  } else {
    await personService.createPerson(data)
  }
  return true;
}

return (
  <>
  <BaseForm fields={getFormFields()} submitCb={submitCb} callback={callback} />
  </>)
}
export default PersonForm;