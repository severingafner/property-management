
import * as Yup from 'yup'
import React from 'react'
import BaseForm from './Form'
import { contractService } from '../../services'
import ThemedSuspense from '../ThemedSuspense'
import getKeyByValue from '../../utils/getKeyByValue'

function 

ContractForm({contract, peopleMap, rentObjectMap, callback}) {

const fields = [
  {
    name: 'tenant',
    type: 'dropdown',
    values: Object.values(peopleMap),
    validation: Yup.string()
  },
  {
    name: 'rentObject',
    type: 'dropdown',
    values: Object.values(rentObjectMap),
    validation: Yup.string()
  },
  {
    name: 'startDate',
    type: 'date',
    validation: Yup.string().required('Start Date is required')
  },
  {
    name: 'endDate',
    type: 'date',
    validation: Yup.string()
  },
  {
    name: 'rent',
    validation: Yup.number().required('Rent is required')
  },
  {
    name: 'additionalCosts',
    validation: Yup.number().required('AdditionalCosts is required')
  },
  {
    name: 'isFlatrate',
    title: 'Are the additional Costs covered by a flatrate',
    type: 'checkbox',
    validation: Yup.bool()
  },
  {
    name: 'deposit',
    validation: Yup.number().required('Deposit is required')
  },
]

const getFormFields = () => fields.map(field => {
  if(field.name === 'tenant') {
    field.default = contract? peopleMap[contract[field.name]] : peopleMap[0];
  } else if(field.name === 'rentObject') {
    field.default = contract? rentObjectMap[contract[field.name]] : rentObjectMap[0];
  } else if (field.type === 'date'){
    field.default = contract? contract[field.name]?.split('T')[0] || '' : ''
  } else {
  field.default = (contract && contract[field.name]) || '';
  }
  return field;
});

const submitCb = async (data) => {
  data.tenant = getKeyByValue(peopleMap, data.tenant) || Object.keys(peopleMap)[0];
  const asd = getKeyByValue(rentObjectMap, data.rentObject);
  data.rentObject = asd || Object.keys(rentObjectMap)[0];
  if(contract) {
    await contractService.updateContract({
      ...contract,
      ...data
    });
  } else {
    await contractService.createContract(data)
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
export default ContractForm;