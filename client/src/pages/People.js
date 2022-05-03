import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import PageError from './Error'
import { SnackbarContext } from '../context/SnackbarContext'
import { personService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import * as Yup from 'yup'
import DeleteModal from '../components/Modals/DeleteModal'
import UpsertModal from '../components/Modals/UpsertModal'

function People() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activePerson, setActivePerson] = useState(null)
  const [people, setPeople] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showFormModal, setShowFormModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing People..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refreshPeople = useCallback(() => {
    setRefreshing(true); 
    return personService.getPeople(currentPage)
    .then(data => {
      setRefreshing(false)
      setPeople(data.results)
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
    refreshPeople()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshPeople])

  const getTableData = () => ({
    header: [
      { name: 'prename', title: 'Prename'},
      { name: 'name', title: 'Name'},
      { name: 'email', title: 'Email'}
    ],
    // destructure people to only get the desired fields
    body: people.map(({prename, name, email}) => ({prename, name, email}))
  })

  const fields = [
    {
      name: 'prename',
      validation: Yup.string().required('Prename is required')
    },
    {
      name: 'name',
      validation: Yup.string().required('Name is required')
    },
    {
      name: 'email',
      validation: Yup.string().email().required('Email is required'),
      type: 'email'
    },
    {
      name: 'iban',
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
    }
  ]

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
        refreshPeople() 
        break
      case 'delete':
        setShowDeleteModal(false) 
        refreshPeople()
        break
      default:
        break
    }
  }

  if(!isLoaded) {
    return <ThemedSuspense />
  }

  if(error) {
    return <PageError message="Some error occured: please try again." />
  }
  return (
    <>
      <div className="flex flex-col pb-6 sm:pb-0 sm:flex-row justify-between sm:items-center">
        <PageTitle>All People</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); handleAction(null, 'upsert')}}>Create Person</Button>
      </div>
      <ActionTable data={getTableData()} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <UpsertModal isOpen={showFormModal} onClose={onModalClose} onAction={onModalAction} name="Person" activeObj={activePerson} fields={fields} onCreate={personService.createPerson} onUpdate={personService.updatePerson}/>
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Person" activeObj={activePerson} submitCB={personService.deletePerson} />
    </>
  )
}
export default People;