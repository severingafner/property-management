import React from "react"
import SimpleModal from "./SimpleModal.js"
import { userService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeleteUserModal({isOpen, onClose, onAction, m_user}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deleteUser')
  }

  const handleModalAction = () => {
    setEnabled(false)
    userService.deleteUser(m_user.id)
    .then(() => {
      setEnabled(true)
      setError(null)
      onAction('deleteUser')
    })
    .catch(err => {
      setEnabled(true)
      if(err.response) {
        setError(err.response.data.message);
      } else {
        setError('Some error occured.');
      }
    })
  }

  return (
    <SimpleModal isOpen={isOpen}
      title="Delete User"
      neg_text="Cancel" 
      pos_text="Delete User"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to delete this user?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}