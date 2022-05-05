import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { propertyService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import PropertyForm from "../components/Forms/PropertyForm.js"
import SectionTitle from '../components/Typography/SectionTitle'

function Property() {
  const { propertyId } = useParams()
  const [property, setProperty] = useState(null)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const refreshProperty = useCallback(() => {
    return propertyService.getProperty(propertyId)
    .then(response => {
      setProperty(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [propertyId])

  useEffect(() => {
    refreshProperty()
    .then(() => {
      setIsLoaded(true)
    })
  }, [refreshProperty])

  const updatePropertyCallback = (m_property) => {
    setProperty({
      ...property, 
      ...m_property
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
      <PageTitle>{property.prename} {property.name}</PageTitle>
      <SectionTitle>Property Data</SectionTitle>
      <PropertyForm property={property} callback={updatePropertyCallback} />
      <div className="flex flex-wrap justify-between mb-4">
        <SectionTitle>Objects</SectionTitle>
          {/* <div>
            <Button onClick={(e) => {e.preventDefault(); handleAction(null, 'createInvitation')}}>Invite Users</Button>
          </div>
          <ActionTable route="properties" data={getTableData()} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} /> */}
      </div>
    </>
  )
}

export default Property;