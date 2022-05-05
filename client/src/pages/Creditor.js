import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { creditorService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import CreditorForm from "../components/Forms/CreditorForm.js"

function Creditor() {
  const { creditorId } = useParams()
  const [creditor, setCreditor] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const refreshCreditor = useCallback(() => {
    return creditorService.getCreditor(creditorId)
    .then(response => {
      setCreditor(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [creditorId])

  useEffect(() => {
    refreshCreditor()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshCreditor])

  const updateCreditorCallback = (m_creditor) => {
    setCreditor({
      ...creditor, 
      ...m_creditor
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
      <PageTitle>{creditor.prename} {creditor.name}</PageTitle>
      <CreditorForm creditor={creditor} callback={updateCreditorCallback} />
    </>
  )
}

export default Creditor;