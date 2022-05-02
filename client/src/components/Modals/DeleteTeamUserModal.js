import React, { useState } from "react"
import SimpleModal from "./SimpleModal.js"
import { teamService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function DeleteTeamUserModal({isOpen, onClose, onAction, team, user}) {
  const [error, setError] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('deleteUser')
  }

  const handleModalAction = () => {
    setEnabled(false)
    teamService.deleteUser(team.id, user.id)
    .then(response => {
      setEnabled(true)
      setError(null)
      onAction(response.data.user, response.data.team, 'deleteUser')
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