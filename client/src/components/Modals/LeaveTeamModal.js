import React, { useState } from "react"
import SimpleModal from "./SimpleModal.js"
import { teamService } from "../../services"
import { HelperText } from '@windmill/react-ui'

export default function LeaveTeamModal({isOpen, onClose, onAction, team}) {
  const [error, setError] = useState(null);
  const [enabled, setEnabled] = useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('leaveTeam')
  }

  const handleModalAction = () => {
    setEnabled(false)
    teamService.leaveTeam(team.id)
    .then(response => {
      setEnabled(true)
      setError(null)
      onAction(response.data.user, response.data.team, 'leaveTeam')
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
      title="Leave Team"
      neg_text="Cancel" 
      pos_text="Leave Team"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>"Are you sure you want to leave this team?"</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}