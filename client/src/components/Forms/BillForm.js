
import * as Yup from 'yup'
import React from 'react'
import BaseForm from './Form'
import { billService } from '../../services'
import ThemedSuspense from '../ThemedSuspense'
import getKeyByValue from '../../utils/getKeyByValue'

function 

BillForm({bill, creditorMap, rentObjectMap, propertyMap, callback}) {

const fields = [
  {
    name: 'creditor',
    type: 'dropdown',
    values: Object.values(creditorMap),
    validation: Yup.string()
  },
  {
    name: 'rentObject',
    type: 'dropdown',
    values: Object.values(rentObjectMap),
    validation: Yup.string()
  },
  // {
  //   name: 'property',
  //   type: 'dropdown',
  //   values: Object.values(propertyMap),
  //   validation: Yup.string()
  // },
  {
    name: 'description',
    validation: Yup.string().required('Description is required')
  },
  {
    name: 'billingDate',
    type: 'date',
    validation: Yup.string().required('Billing Date is required')
  },
  {
    name: 'dueDate',
    type: 'date',
    validation: Yup.string().required('Due Date is required')
  },
  {
    name: 'grossAmount',
    validation: Yup.number().required('Gross Amount is required')
  },
  {
    name: 'netAmount',
    validation: Yup.number().required('Net Amount is required')
  },
  {
    name: 'category',
    type: 'radio',
    values: ['general', 'extra'],
    validation: Yup.string().default(() => 'general')
  }, 
]

const getFormFields = () => fields.map(field => {
  if(field.name === 'creditor') {
    field.default = bill? creditorMap[bill[field.name]] : creditorMap[0];
  } else if(field.name === 'rentObject') {
    field.default = bill? rentObjectMap[bill[field.name]] : rentObjectMap[0];
  } else if(field.name === 'property') {
    field.default = bill? propertyMap[bill[field.name]] : propertyMap[0];
  } else if (field.type === 'date'){
    field.default = bill? bill[field.name]?.split('T')[0] || '' : ''
  } else {
    field.default = (bill && bill[field.name]) || '';
  }
  return field;
});

const submitCb = async (data) => {
  data.creditor = getKeyByValue(creditorMap, data.creditor) || Object.keys(creditorMap)[0];
  const rentObject = getKeyByValue(rentObjectMap, data.rentObject);
  data.rentObject = rentObject || Object.keys(rentObjectMap)[0];
  const property = getKeyByValue(rentObjectMap, data.property);
  data.property = property || Object.keys(propertyMap)[0];
  if(bill) {
    await billService.updateBill({
      ...bill,
      ...data
    });
  } else {
    await billService.createBill(data)
  }
  return true;
}
if(!fields) {
  return <ThemedSuspense />
}
return (
  <>
  <BaseForm fields={getFormFields()} submitCb={submitCb} callback={callback} />
  </>)
}
export default BillForm;