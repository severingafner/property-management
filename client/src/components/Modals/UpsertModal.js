import React from "react"
import SimpleModal from './SimpleModal.js'
import BaseForm from '../Forms/Form'
export default function UpsertModal({isOpen, onClose, onAction, activeObj, name, fields, onCreate, onUpdate}) {
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

  const getFormFields = () => fields.map(field => {
      field.default = (activeObj && activeObj[field.name]) || '';
      return field;
    });
  
  const submitCb = async (data) => {
    if(activeObj) {
      await onUpdate({
        ...activeObj,
        ...data
      });
    } else {
      await onCreate(data)
    }
    return true;
  }
  return (
    <SimpleModal isOpen={isOpen}
      title={(activeObj ? 'Update' : 'Create') + name}
      neg_text="Cancel" 
      pos_text="Confirm"
      onClose={handleModalClose}
      onAction={handleModalAction}
      enabled={enabled}
      body={<BaseForm fields={getFormFields()} submitCb={submitCb} formRef={formRef} callback={formSubmitCallback} />} />
  );
}