
import * as Yup from 'yup'
import React, { useState, useEffect } from 'react'
import BaseForm from './Form'
import { propertyService, personService } from '../../services'
import ThemedSuspense from '../ThemedSuspense'
import getKeyByValue from '../../utils/getKeyByValue'

function PropertyForm({property, callback}) {
  const [peopleMap, setPeopleMap] = useState(null)
  const [fields, setFields] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

const fetchPeople = () => {
  setIsLoaded(false);
  personService.getPeople(1)
  .then(data => {
    const m_peopleMap = {};
    data.results.forEach(person => (
      m_peopleMap[person.id] = person.prename + ' ' + person.name
    ));
    setPeopleMap(m_peopleMap);
    setFields([
      {
        name: 'description',
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
      },
      {
        name: 'owner',
        type: 'dropdown',
        values:Object.values(m_peopleMap),
        validation: Yup.string().required('Owner is required')
      },
      {
        name: 'insurance',
        validation: Yup.string().required('Insurance is required')
      },
      {
        name: 'janitor',
        validation: Yup.string()
      }
    ])
    return null
  })
  .catch(err => {
    return null
  })
  .finally(() => {
    setIsLoaded(true);
  })
}

  useEffect(() => {
    fetchPeople();
  }, [])

const getFormFields = () => fields.map(field => {
  if(field.name === 'owner') {
    field.default = peopleMap[property[field.name]];
  } else {
    field.default = (property && property[field.name]) || '';
  }
  return field;
});

const submitCb = async (data) => {
  // replace the displayed data with the Id
  data.owner = getKeyByValue(peopleMap, data.owner);
  if(property) {
    await propertyService.updateProperty({
      ...property,
      ...data
    });
  } else {
    await propertyService.createProperty(data)
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
export default PropertyForm;