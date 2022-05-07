import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { contractService, propertyService, personService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import ContractForm from "../components/Forms/ContractForm.js"
import RentObjectForm from "../components/Forms/RentObjectForm.js"
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'

function Contract() {
  const { contractId } = useParams()
  const [contract, setContract] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeRentObject, setActiveRentObject] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [peopleMap, setPeopleMap] = useState(null)
  const [rentObjectMap, setRentObjectMap] = useState(null)
  
  const refreshContact = useCallback(() => {
    return contractService.getContract(contractId)
    .then(response => {
      setContract(response.data)
    })
    .catch(err => {
      setError(err)
    })
  }, [contractId])

  const refreshPeople = useCallback(() => {
    return personService.getPeople(1)
    .then(peopleData => {
      const m_peopleMap = {};
      peopleData.results.forEach(person => (
        m_peopleMap[person.id] = person.prename + ' ' + person.name
      ));
      setPeopleMap(m_peopleMap);
    })
    .catch(err => {
      setError(err)
    })
  }, [])

  const refreshRentObjects = useCallback(() => {
    return propertyService.getProperties(1)
      .then(objData => { 
        const m_rentObjectMap = {};
        objData.results.forEach(property => (
          property.rentObjects.forEach((obj) => {
            m_rentObjectMap[obj.id] = property.description + ' ' + obj.position
          })
        ));
        setRentObjectMap(m_rentObjectMap);
      })
    .catch(err => {
      setError(err)
    })
  }, [])

  useEffect(() => {
    refreshContact()
    .then(() => {
      refreshPeople()
      .then(() => {
        refreshRentObjects()
        .then(() => {
          setIsLoaded(true)
        })
      })
    })
  }, [refreshContact])

  const getTableData = () => ({
    header: [
      { name: 'position', title: 'Position'},
      { name: 'type', title: 'Type'},
    ],
    // destructure contracts to only get the desired fields
    body: contract.rentObjects.map(({position, type}) => ({position, type})),
    rawData: contract.rentObjects
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
        refreshContact()
        break
      default:
        break
    }
  }

  const updateContractCallback = (m_contract) => {
    setContract({
      ...contract, 
      ...m_contract
    })
  }

  const createObjectCallback = () => {
    setShowCreateForm(false);
    refreshContact();
  }

  const deleteCallback = (objId) => {
    return contractService.deleteContract(objId)
  }
  
  if(!isLoaded) {
    return <ThemedSuspense />
  }
  if(error) {
      return <PageError message="Some error occured : please try again." />
  }

  return (
    <>
      <PageTitle>{contract.prename} {contract.name}</PageTitle>
      <SectionTitle>Contract Data</SectionTitle>
      <ContractForm contract={contract} peopleMap={peopleMap} rentObjectMap={rentObjectMap} callback={updateContractCallback} />
      {/* <div className="flex flex-wrap justify-between mb-4">
        <SectionTitle>Payments</SectionTitle>
          <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Add Payment</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Payment</SectionTitle>
          <RentObjectForm contractId={contractId} callback={createObjectCallback}/>
        </>
      }
      <ActionTable route="payments" data={getTableData()} totalRows={contract.rentObjects.length} onAction={handleAction} onPageChange={() => {}} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Payment" activeObj={activeRentObject} submitCB={deleteCallback} /> */}
    </>
  )
}

export default Contract;