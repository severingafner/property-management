import React from "react"
import SimpleModal from './SimpleModal.js'
import BaseForm from '../Forms/Form'
import { personService } from "../../services"
import * as Yup from 'yup'
export default function CreateUserModal({isOpen, onClose, onAction, activePerson}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('upsert')
  }

  const handleModalAction = () => {
    if (formRef.current) {
      formRef.current.validateForm()
      .then(() => {
        setEnabled(!formRef.current.isValid)
        formRef.current.handleSubmit()
      })
    }
  }

  const formSubmitCallback = (val) => {
    setEnabled(true)
    if(val) onAction('upsert')
  }
  const fields = [
    {
      name: 'prename',
      default: activePerson?.prename || '',
      validation: Yup.string().required('Prename is required')
    },
    {
      name: 'name',
      default: activePerson?.name || '',
      validation: Yup.string().required('Name is required')
    },
    {
      name: 'email',
      default: activePerson?.email || '',
      validation: Yup.string().email().required('Email is required'),
      type: 'email'
    },
    {
      name: 'iban',
      default: activePerson?.iban || '',
      validation: Yup.string()
    },
    {
      name: 'street',
      default: activePerson?.street || '',
      validation: Yup.string().required('Street is required')
    },
    {
      name: 'housenumber',
      default: activePerson?.housenumber || '',
      validation: Yup.string()
    },
    {
      name: 'zip',
      default: activePerson?.zip || '',
      validation: Yup.string().required('Zip is required')
    },
    {
      name: 'city',
      default: activePerson?.city || '',
      validation: Yup.string().required('City is required')
    }
  ]

  const submitCb = async (data) => {
    console.log(activePerson);
    if(activePerson) {
      await personService.updatePerson({
        ...activePerson,
        ...data
      });
    } else {
      await personService.createPerson(data)
    }
    return true;
  }
  return (
    <SimpleModal isOpen={isOpen}
      title={activePerson ? 'Update Person' : 'Create Person'}
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<BaseForm fields={fields} submitCb={submitCb} formRef={formRef} callback={formSubmitCallback} />} />
  );
}