import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import { SnackbarContext } from '../context/SnackbarContext'
import { personService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import PersonTable from '../components/Tables/PersonTable'
import CreatePersonModal from '../components/Modals/CreatePersonModal'
import DeleteModal from '../components/Modals/DeleteModal'

function Persons() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activePerson, setActivePerson] = useState(null)
  const [persons, setPersons] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing Persons..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refreshPersons = useCallback(() => {
    setRefreshing(true); 
    return personService.getPersons(currentPage)
    .then(data => {
      console.log(data);
      setRefreshing(false)
      setPersons(data.results)
      setTotalResults(data.totalResults)
      return null
    })
    .catch(err => {
      setRefreshing(false)
      setError(err)
      return null
    })
  }, [currentPage])

  useEffect(() => {
    refreshPersons()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshPersons])

  const handleAction = (user, type) => {
    setActivePerson(user)
    switch(type) {
      case 'upsert' :
        setShowFormModal(true) 
        break
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActivePerson(null) 
        break
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActivePerson(null)
    switch(type) {
      case 'upsert' :
        setShowFormModal(false) 
        break
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActivePerson(null)
    switch(type) {
      case 'upsert' :
        setShowFormModal(false) 
        refreshPersons() 
        break
      case 'delete':
        setShowDeleteModal(false) 
        refreshPersons()
        break
      default:
        break
    }
  }

  if(!isLoaded) {
    return <ThemedSuspense />
  }
  return (
    <>
      <div className="flex flex-col pb-6 sm:pb-0 sm:flex-row justify-between sm:items-center">
        <PageTitle>All Persons</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); handleAction(null, 'upsert')}}>Create Person</Button>
      </div>
      <PersonTable persons={persons} totalResults={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <CreatePersonModal isOpen={showFormModal} onClose={onModalClose} onAction={onModalAction} activePerson={activePerson} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Person" activeObj={activePerson} submitCB={personService.deletePerson} />
    </>
  )
}
export default Persons;