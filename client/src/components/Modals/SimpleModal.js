import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

function SimpleModal({title, pos_text, neg_text, body, isOpen, onClose, onAction, enabled}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={onClose}>
              {neg_text}
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={onAction} disabled={!enabled}>
              {pos_text}
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={onClose}>
              {neg_text}
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={onAction} disabled={!enabled}>
              {pos_text}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SimpleModal
