import React from "react"
import SimpleModal from './SimpleModal.js'
import CreateUserForm from '../Forms/CreateUserForm'
export default function CreateUserModal({isOpen, onClose, onAction}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('createUser')
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
    if(val) onAction('createUser')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Create User"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<CreateUserForm formRef={formRef} callback={formSubmitCallback} />} />
  );
}