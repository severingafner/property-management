
import * as Yup from 'yup'
import React from "react"
import BaseForm from './Form'
import { propertyService, rentObjectService } from '../../services'

function RentObjectForm({propertyId, rentObject, callback}) {

  const fields = [
    {
      name: 'position',
      validation: Yup.string().required('Position is required')
    },
    {
      name: 'area',
      validation: Yup.number()
    },
    {
      name: 'type',
      type: 'radio',
      values: ['apartment', 'cellar', 'garage', 'parkinglot'],
      validation: Yup.string().default(() => 'apartment')
    }
  ]

const getFormFields = () => fields.map(field => {
  field.default = (rentObject && rentObject[field.name]) || '';
  return field;
});

const submitCb = async (data) => {
  if(rentObject) {
    await propertyService.updateRentObject({
      ...rentObject,
      ...data
    });
  } else {
    await rentObjectService.createRentObject(propertyId, data)
  }
  return true;
}

return (
  <>
  <BaseForm fields={getFormFields()} submitCb={submitCb} callback={callback} />
  </>)
}
export default RentObjectForm;