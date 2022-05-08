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
    }, 
    {
      condition: 'type:apartment',
      name: 'hasRefrigerator',
      title: 'has Redrigerator',
      type: 'checkbox',
      validation: Yup.bool()
    },
    {
      condition: 'type:apartment',
      name: 'hasDishwasher',
      title: 'has Dishwasher',
      type: 'checkbox',
      validation: Yup.bool()
    },
    {
      condition: 'type:apartment',
      name: 'hasStove',
      title: 'has Stove',
      type: 'checkbox',
      validation: Yup.bool()
    },
    {
      condition: 'type:apartment',
      name: 'hasOven',
      title: 'has Oven',
      type: 'checkbox',
      validation: Yup.bool()
    },
    {
      condition: 'type:apartment',
      name: 'hasWashingMachine',
      title: 'has Washing Machine',
      type: 'checkbox',
      validation: Yup.bool()
    },
    {
      condition: 'type:apartment',
      name: 'hasTumbler',
      title: 'has Tumbler',
      type: 'checkbox',
      validation: Yup.bool()
    },
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