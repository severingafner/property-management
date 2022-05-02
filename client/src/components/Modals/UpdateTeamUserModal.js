import React, {useState, useRef} from "react"
import SimpleModal from './SimpleModal.js'
import UpdateTeamUserForm from '../Forms/UpdateTeamUserForm'

export default function UpdateTeamUserModal({team, user, isOpen, onClose, onAction}) {
  const [enabled, setEnabled] = useState(true)
  const formRef = useRef()

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
    if(val) onAction(val.user, val.team, 'updateUser')
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Invite User"
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<UpdateTeamUserForm team={team} user={user} formRef={formRef} callback={formSubmitCallback} />} />
  );
}