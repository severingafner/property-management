import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import PageError from './Error'
import { SnackbarContext } from '../context/SnackbarContext'
import { billService, creditorService, propertyService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'
import BillForm from "../components/Forms/BillForm.js"

function Bills() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activeBill, setActiveBill] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creditorMap, setCreditorMap] = useState(null)
  const [rentObjectMap, setRentObjectMap] = useState(null)
  const [propertyMap, setPropertyMap] = useState(null)
  const [tableData, setTableData] = useState(null)

  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing Bills..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refresh = useCallback(() => {
    setRefreshing(true); 
    return billService.getBills(currentPage)
    .then(data => {
      setRefreshing(false)
      setTotalResults(data.totalResults)
      creditorService.getCreditors(1)
      .then(creditorData => {
        const m_creditorMap = {};
        creditorData.results.forEach(creditor => (
          m_creditorMap[creditor.id] = creditor.name
        ));
        setCreditorMap(m_creditorMap);
        propertyService.getProperties(1)
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
          setTableData({
            header: [
              { name: 'description', title: 'Description'},
              { name: 'grossAmount', title: 'Amount'},
              { name: 'creditor', title: 'Creditor'},
            ],
            // destructure bills to only get the desired fields
            body: data.results.map((cont) => {
              return {
                description: cont.description,
                grossAmount: cont.grossAmount,
                creditor: m_creditorMap[cont.creditor], 
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
    setActiveBill(user)
    switch(type) {
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActiveBill(null) 
        break
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActiveBill(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveBill(null)
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
        <PageTitle>All Bills</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Create Bill</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Bill</SectionTitle>
          <BillForm creditorMap={creditorMap} rentObjectMap={rentObjectMap} propertyMap={propertyMap} callback={createCallback}/>
        </>
      }
      <ActionTable route="bills" data={tableData} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Bill" activeObj={activeBill} submitCB={billService.deleteBill} />
    </>
  )
}
export default Bills;