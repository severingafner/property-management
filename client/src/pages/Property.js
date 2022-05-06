import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { propertyService, rentObjectService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import PropertyForm from "../components/Forms/PropertyForm.js"
import RentObjectForm from "../components/Forms/RentObjectForm.js"
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'

function Property() {
  const { propertyId } = useParams()
  const [property, setProperty] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeRentObject, setActiveRentObject] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const refreshData = useCallback(() => {
    return propertyService.getProperty(propertyId)
    .then(response => {
      setProperty(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [propertyId])

  useEffect(() => {
    refreshData()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshData])

  const getTableData = () => ({
    header: [
      { name: 'position', title: 'Position'},
      { name: 'type', title: 'Type'},
    ],
    // destructure properties to only get the desired fields
    body: property.rentObjects.map(({position, type}) => ({position, type})),
    rawData: property.rentObjects
  })

  const handleAction = (obj, type) => {
    console.log(obj);
    setActiveRentObject(obj)
    switch(type) {
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActiveRentObject(null) 
        break
    }
  }

  const onModalClose = (type) => {
    setActiveRentObject(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveRentObject(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        refreshData()
        break
      default:
        break
    }
  }

  const updatePropertyCallback = (m_property) => {
    setProperty({
      ...property, 
      ...m_property
    })
  }

  const createObjectCallback = () => {
    setShowCreateForm(false);
    refreshData();
  }

  const deleteCallback = (objId) => {
    return rentObjectService.deleteRentObject(property.id, objId)
  }
  
  if(!isLoaded) {
    return <ThemedSuspense />
  }
  if(error) {
      return <PageError message="Some error occured : please try again." />
  }

  return (
    <>
      <PageTitle>{property.prename} {property.name}</PageTitle>
      <SectionTitle>Property Data</SectionTitle>
      <PropertyForm property={property} callback={updatePropertyCallback} />
      <div className="flex flex-wrap justify-between mb-4">
        <SectionTitle>Objects</SectionTitle>
          <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Add Object</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Object</SectionTitle>
          <RentObjectForm propertyId={propertyId} callback={createObjectCallback}/>
        </>
      }
      <ActionTable route="objects" data={getTableData()} totalRows={property.rentObjects.length} onAction={handleAction} onPageChange={() => {}} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Object" activeObj={activeRentObject} submitCB={deleteCallback} />
    </>
  )
}

export default Property;