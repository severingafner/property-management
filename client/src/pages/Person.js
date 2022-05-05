import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { personService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import PersonForm from "../components/Forms/PersonForm.js"

function Person() {
  const { personId } = useParams()
  const [person, setPerson] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const refreshPerson = useCallback(() => {
    return personService.getPerson(personId)
    .then(response => {
      setPerson(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [personId])

  useEffect(() => {
    refreshPerson()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshPerson])

  const updatePersonCallback = (m_person) => {
    setPerson({
      ...person, 
      ...m_person
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
      <PageTitle>{person.prename} {person.name}</PageTitle>
      <PersonForm person={person} callback={updatePersonCallback} />
    </>
  )
}

export default Person;