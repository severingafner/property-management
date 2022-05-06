
import * as Yup from 'yup'
import React, { useState, useEffect } from 'react'
import BaseForm from './Form'
import { contractService, personService, propertyService } from '../../services'
import ThemedSuspense from '../ThemedSuspense'
import getKeyByValue from '../../utils/getKeyByValue'

function ContractForm({contract, callback}) {
  const [peopleMap, setPeopleMap] = useState(null)
  const [rentObjectMap, setRentObjectMap] = useState(null)
  const [fields, setFields] = useState(null)

const fetchPeople = () => {
  personService.getPeople(1)
  .then(data => {
    const m_peopleMap = {};
    data.results.forEach(person => (
      m_peopleMap[person.id] = person.prename + ' ' + person.name
    ));
    setPeopleMap(m_peopleMap);
    propertyService.getProperties(1)
    .then(objData => { 
      const m_rentObjectMap = {};
      objData.results.forEach(property => (
        property.rentObjects.forEach((obj) => {
          m_rentObjectMap[obj.id] = property.description + ' ' + obj.position
        })
      ));
      setRentObjectMap(m_rentObjectMap);
      setFields([
        {
          name: 'startDate',
          validation: Yup.date().required('Start Date is required')
        },
        {
          name: 'endDate',
          validation: Yup.date()
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
          type: 'checkbox',
          validation: Yup.bool().required('Is Flatrate is required')
        },
        {
          name: 'deposit',
          validation: Yup.number().required('Deposit is required')
        },
        {
          name: 'tenant',
          type: 'dropdown',
          values:Object.values(m_peopleMap),
          validation: Yup.string().required('Tenant is required')
        },
        {
          name: 'rentObject',
          type: 'dropdown',
          values:Object.values(m_rentObjectMap),
          validation: Yup.string().required('Object is required')
        }
      ])
      
    })
    return null
  })
  .catch(err => {
    return null
  })
  .finally(() => {
  })
}

  useEffect(() => {
    fetchPeople();
  }, [])

const getFormFields = () => fields.map(field => {
  if(field.name === 'tenant') {
    field.default = contract? peopleMap[contract[field.name]] : peopleMap[0];
  } else if(field.name === 'rentObject') {
      field.default = contract? rentObjectMap[contract[field.name]] : rentObjectMap[0];
    } else {
    field.default = (contract && contract[field.name]) || '';
  }
  return field;
});

const submitCb = async (data) => {
  data.tenant = getKeyByValue(peopleMap, data.tenant);
  data.rentObject = getKeyByValue(rentObjectMap, data.rentObject);
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