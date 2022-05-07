import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { contractService, propertyService, personService } from '../services'
import ThemedSuspense from '../components/ThemedSuspense'
import PageError from './Error'
import PageTitle from '../components/Typography/PageTitle'
import ContractForm from "../components/Forms/ContractForm.js"
import PaymentForm from "../components/Forms/PaymentForm.js"
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Button
} from '@windmill/react-ui'
import ActionTable from '../components/Tables/ActionTable'
import DeleteModal from '../components/Modals/DeleteModal'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { MoneyIcon } from '../icons'

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
  const [balance, setBalance] = useState(null)
  const [color, setColor] = useState(null)
  
  const monthDiff = (dateFrom, dateTo) => {
    return dateTo.getMonth() - dateFrom.getMonth() + 
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
  }

  const refreshContact = useCallback(() => {
    return contractService.getContract(contractId)
    .then(response => {
      const m_contract = response.data;
      const payedAmount = m_contract.payments.reduce(((acc, payment) => acc + payment.amount), 0);
      const contractMonths = monthDiff(new Date(m_contract.startDate), new Date(m_contract.endDate));
      const dueAmount = contractMonths * (m_contract.rent + (m_contract.aditionalCosts || 0));
      const m_balance = payedAmount - dueAmount;
      setBalance(m_balance);
      setColor(m_balance < 0? 'red' : 'green');
      setContract(m_contract)
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
  }, [refreshContact, refreshPeople, refreshRentObjects])

  const getTableData = () => ({
    header: [
      { name: 'amount', title: 'Amount'},
      { name: 'date', title: 'Date'},
    ],
    // destructure contracts to only get the desired fields
    body: contract.payments.map(({amount, date}) => ({amount, date: date ? new Date(date).toDateString() : '',})),
    rawData: contract.payments
  })

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

  const createObjectCallback = (m_payment) => {
    const newPayment = {
      amount: m_payment.amount,
      date: new Date(m_payment.date).toISOString()
    }
    setShowCreateForm(false);
      const payments = [...contract.payments , m_payment];
      setContract({
        ...contract,
        payments:  payments
      })
  }

  const deletePayment = (m_payment) => {
    setContract({
      ...contract,
      payments: contract.payments.filter(payment => payment !== m_payment)
    })
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
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Account balance" value={balance}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass={`text-${color}-500 dark:text-${color}-100`}
            bgColorClass={`bg-${color}-100 dark:bg-${color}-500`}
            className="mr-4"
          />
        </InfoCard>
      </div>
      <SectionTitle>Contract Data</SectionTitle>
      <ContractForm contract={contract} peopleMap={peopleMap} rentObjectMap={rentObjectMap} callback={updateContractCallback} />
      <div className="flex flex-wrap justify-between mb-4">
        <SectionTitle>Payments</SectionTitle>
          <Button onClick={(e) => {e.preventDefault(); setShowCreateForm(!showCreateForm)}}>Add Payment</Button>
      </div>
      {showCreateForm && 
        <>
          <SectionTitle>Create Payment</SectionTitle>
          <PaymentForm callback={createObjectCallback}/>
        </>
      }
      <ActionTable route="" data={getTableData()} totalRows={contract.payments.length} onAction={deletePayment} onPageChange={() => {}} />
      <DeleteModal isOpen={showDeleteModal} onClose={onModalClose} onAction={onModalAction} name="Payment" activeObj={activeRentObject} submitCB={deleteCallback} />
    </>
  )
}

export default Contract;