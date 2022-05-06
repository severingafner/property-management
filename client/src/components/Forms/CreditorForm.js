
import * as Yup from 'yup'
import React from "react"
import BaseForm from './Form'
import { creditorService } from '../../services'

function CreditorForm({creditor, callback}) {


  const fields = [
    {
      name: 'name',
      validation: Yup.string().required('Name is required')
    },
    {
      name: 'taxnumber',
      validation: Yup.number().required('Tax Number is required')
    },
    {
      name: 'state',
      type: 'radio',
      values: ['active', 'locked'],
      validation: Yup.string().default(() => 'active')
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
  field.default = (creditor && creditor[field.name]) || '';
  return field;
});

const submitCb = async (data) => {
  if(creditor) {
    await creditorService.updateCreditor({
      ...creditor,
      ...data
    });
  } else {
    await creditorService.createCreditor(data)
  }
  return true;
}

return (
  <>
  <BaseForm fields={getFormFields()} submitCb={submitCb} callback={callback} />
  </>)
}
export default CreditorForm;