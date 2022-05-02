import React from "react"
import SimpleModal from './SimpleModal'
import UpdateUserForm from '../Forms/UpdateUserForm'

export default function UpdateUserModal({isOpen, onClose, onAction, m_user}) {
  const [enabled, setEnabled] = React.useState(true)
  const formRef = React.useRef()

  const handleModalClose = () => {
    setEnabled(true)
    onClose('updateUser')
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
    if(val) onAction('updateUser')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Update User"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<UpdateUserForm formRef={formRef} callback={formSubmitCallback} m_user={m_user} />} />
  );
}