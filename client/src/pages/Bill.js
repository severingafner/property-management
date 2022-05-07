import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { billService, propertyService, creditorService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import BillForm from "../components/Forms/BillForm.js"
import SectionTitle from '../components/Typography/SectionTitle'


function Bill() {
  const { billId } = useParams()
  const [bill, setBill] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [creditorMap, setCreditorMap] = useState(null)
  const [rentObjectMap, setRentObjectMap] = useState(null)
  const [propertyMap, setPropertyMap] = useState(null)

  const refreshContact = useCallback(() => {
    return billService.getBill(billId)
    .then(response => {
      const m_bill = response.data;
      setBill(m_bill)
    })
    .catch(err => {
      setError(err)
    })
  }, [billId])

  const refreshContract = useCallback(() => {
    return creditorService.getCreditors(1)
    .then(creditorData => {
      const m_creditorMap = {};
      creditorData.results.forEach(person => (
        m_creditorMap[person.id] = person.name
      ));
      setCreditorMap(m_creditorMap);
    })
    .catch(err => {
      setError(err)
    })
  }, [])

  const refreshRentObjects = useCallback(() => {
    return propertyService.getProperties(1)
      .then(objData => { 
        const m_rentObjectMap = {};
        const m_propertyMap = {};
        objData.results.forEach(property => {
          property.rentObjects.forEach((obj) => {
            m_rentObjectMap[obj.id] = property.description + ' ' + obj.position
          })
          m_propertyMap[property.id] = property.description;
        });
        setRentObjectMap(m_rentObjectMap);
        setPropertyMap(m_propertyMap);
      })
    .catch(err => {
      setError(err)
    })
  }, [])

  useEffect(() => {
    refreshContact()
    .then(() => {
      refreshContract()
      .then(() => {
        refreshRentObjects()
        .then(() => {
          setIsLoaded(true)
        })
      })
    })
  }, [refreshContact, refreshContract, refreshRentObjects])

  const updateBillCallback = (m_bill) => {
    setBill({
      ...bill, 
      ...m_bill
    })
  }

  if(!isLoaded) {
    return <ThemedSuspense />
  }
  if(error) {
      return <PageError message="Some error occured : please try again." />
  }

  return (
    <>
      <PageTitle>{bill.prename} {bill.name}</PageTitle>
      <SectionTitle>Bill Data</SectionTitle>
      <BillForm bill={bill} creditorMap={creditorMap} rentObjectMap={rentObjectMap} propertyMap={propertyMap} callback={updateBillCallback} />
     </>
  )
}

export default Bill;