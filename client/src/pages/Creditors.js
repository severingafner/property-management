import React, { useState, useEffect, useContext, useCallback } from 'react'
import ThemedSuspense from '../components/ThemedSuspense'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import PageError from './Error'
import { SnackbarContext } from '../context/SnackbarContext'
import { creditorService } from '../services'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'
import CreditorForm from "../components/Forms/CreditorForm.js"

function Creditors() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const [refreshing, setRefreshing] = useState(false)
  const [activeCreditor, setActiveCreditor] = useState(null)
  const [creditors, setCreditors] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    if(refreshing) {
      openSnackbar('Refresing Creditors..')
    } else {
      closeSnackbar()
    }
  }, [refreshing, openSnackbar, closeSnackbar])

  const refresh = useCallback(() => {
    setRefreshing(true); 
    return creditorService.getCreditors(currentPage)
    .then(data => {
      setRefreshing(false)
      setCreditors(data.results)
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
      { name: 'name', title: 'Name'},
      { name: 'taxnumber', title: 'Tax Number'},
      { name: 'state', title: 'State'}
    ],
    // destructure creditors to only get the desired fields
    body: creditors.map(({name, taxnumber, state}) => ({name, taxnumber, state})),
    rawData: creditors
  })

  const handleAction = (user, type) => {
    setActiveCreditor(user)
    switch(type) {
      case 'delete':
        setShowDeleteModal(true) 
        break
      default:
        setActiveCreditor(null) 
        break
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const onModalClose = (type) => {
    setActiveCreditor(null)
    switch(type) {
      case 'delete':
        setShowDeleteModal(false) 
        break
      default:
        break
    } 
  }

  const onModalAction = (type) => {
    setActiveCreditor(null)
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
        <PageTitle>All Creditors</PageTitle>
        <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Create Creditor</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Creditor</SectionTitle>
          <CreditorForm callback={createCallback}/>
        </>
      }
      <ActionTable route="creditors" data={getTableData()} totalRows={totalResults} onAction={handleAction} onPageChange={handlePageChange} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Creditor" activeObj={activeCreditor} submitCB={creditorService.deleteCreditor} />
    </>
  )
}
export default Creditors;