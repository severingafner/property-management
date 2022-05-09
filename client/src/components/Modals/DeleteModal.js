import React from "react"
import SimpleModal from "./SimpleModal.js"
import { HelperText } from '@windmill/react-ui'

export default function DeleteModal({isOpen, onClose, onAction, name, activeObj, submitCB}) {
  const [error, setError] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);

  const handleModalClose = () => {
    setEnabled(true)
    setError(null)
    onClose('delete')
  }

  const handleModalAction = () => {
    setEnabled(false)
    submitCB(activeObj.id)
    .then(() => {
      setEnabled(true)
      setError(null)
      onAction('delete')
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
      title={'Delete ' + name}
      neg_text="Cancel" 
      pos_text={'Delete ' + name}
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<div>
        <p>Are you sure you want to delete this {name}?</p>
        {error && (
          <HelperText valid={false}>{error}</HelperText>
        )}
      </div>} />
  );
}