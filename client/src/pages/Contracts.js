import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import PageError from './Error'
import { SnackbarContext } from '../context/SnackbarContext'
import { contractService, personService, propertyService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'
import ContractForm from "../components/Forms/ContractForm.js"

function Contracts() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activeContract, setActiveContract] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [peopleMap, setPeopleMap] = useState(null)
  const [rentObjectMap, setRentObjectMap] = useState(null)
  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing Contracts..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refresh = useCallback(() => {
    setRefreshing(true); 
    return contractService.getContracts(currentPage)
    .then(data => {
      setRefreshing(false)
      setTotalResults(data.totalResults)
      personService.getPeople(1)
      .then(peopleData => {
        const m_peopleMap = {};
        peopleData.results.forEach(person => (
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
          setTableData({
            header: [
              { name: 'startDate', title: 'Start Date'},
              { name: 'end Date', title: 'End Date'},
              { name: 'tenant', title: 'Tenant'},
              { name: 'rentObject', title: 'Object'},
            ],
            // destructure contracts to only get the desired fields
            body: data.results.map((cont) => {
              return {
                startDate: cont.startDate ? new Date(cont.startDate).toDateString() : '',
                endDate: cont.endDate ? new Date(cont.endDate).toDateString() : '',
                tenant: m_peopleMap[cont.tenant], 
                rentObject: m_rentObjectMap[cont.rentObject]
              }}),
            rawData: data.results
          })
          setIsLoaded(true)
        })
      });
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
      // setIsLoaded(true)
    })
  }, [refresh])


  const handleAction = (user, type) => {
    setActiveContract(user)
    switch(type) {
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActiveContract(null) 
        break
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActiveContract(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveContract(null)
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
        <PageTitle>All Contracts</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Create Contract</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Contract</SectionTitle>
          <ContractForm peopleMap={peopleMap} rentObjectMap={rentObjectMap} callback={createCallback}/>
        </>
      }
      <ActionTable route="contracts" data={tableData} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Contract" activeObj={activeContract} submitCB={contractService.deleteContract} />
    </>
  )
}
export default Contracts;