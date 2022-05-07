
import * as Yup from 'yup'
import React, { useEffect } from "react"
import BaseForm from './Form'
import { propertyService, rentObjectService } from '../../services'
// import { Formik, Form, useField, useFormikContext } from 'formik'

// const AppartmentField = (props) => {
//   const {
//     values: { type },
//     touched,
//     setFieldValue,
//   } = useFormikContext();
//   const [field, meta] = useField(props);
//   useEffect(() => {
//     if(type === 'apartment')  {

//     }
//   });
// }

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