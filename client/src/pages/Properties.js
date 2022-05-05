import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import PageError from './Error'
import { SnackbarContext } from '../context/SnackbarContext'
import { propertyService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'
import PropertyForm from "../components/Forms/PropertyForm.js"

function Properties() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activeProperty, setActiveProperty] = useState(null)
  const [properties, setProperties] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing Properties..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refresh = useCallback(() => {
    setRefreshing(true); 
    return propertyService.getProperties(currentPage)
    .then(data => {
      setRefreshing(false)
      setProperties(data.results)
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
    refresh()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refresh])

  const getTableData = () => ({
    header: [
      { name: 'street', title: 'Street'},
      { name: 'housenumber', title: 'Housenumber'},
      { name: 'zip', title: 'ZIP'},
      { name: 'city', title: 'City'},
    ],
    // destructure properties to only get the desired fields
    body: properties.map(({street, housenumber, zip, city}) => ({street, housenumber, zip, city})),
    rawData: properties
  })

  const handleAction = (user, type) => {
    setActiveProperty(user)
    switch(type) {
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActiveProperty(null) 
        break
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActiveProperty(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveProperty(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        refresh()
        break
      default:
        break
    }
  }

  const createCallback = () => {
    setShowCreateForm(false);
    refresh();
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
        <PageTitle>All Properties</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Create Property</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Property</SectionTitle>
          <PropertyForm callback={createCallback}/>
        </>
      }
      <ActionTable route="properties" data={getTableData()} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Property" activeObj={activeProperty} submitCB={propertyService.deleteProperty} />
    </>
  )
}
export default Properties;