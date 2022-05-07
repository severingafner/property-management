
import * as Yup from 'yup'
import React from "react"
import BaseForm from './Form'

function PaymentForm({callback}) {

const fields = [
  {
    name: 'amount',
    validation: Yup.number().required('Amount is required')
  },
  {
    name: 'date',
    type: 'date',
    validation: Yup.string()
  },
]

const getFormFields = () => fields;

const submitCb = async (data) => {
  return true;
}

return (
  <>
  <BaseForm fields={getFormFields()} submitCb={submitCb} callback={callback} />
  </>)
}
export default PaymentForm;