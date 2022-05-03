import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input, Label, HelperText } from '@windmill/react-ui'
import capitalize from '../../utils/capitalize'

function BaseForm({fields, submitCb, formRef, callback}) {
  const initialValues = {}
  const validationSchema = {};
  fields.forEach((field) => {
    initialValues[field.name] = field.default;
    validationSchema[field.name] = field.validation
  });
  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={(data, { setStatus, setSubmitting }) => {
        setStatus();
        setTimeout(async () => {
          await submitCb(data)
          .then(
            response => {
              callback(true);
            },
            error => {
              if(error.response) {
                setStatus(error.response.data.message);
              } else {
                setStatus('Some error occured.');
              }
              callback(false);
            }
          );
        }, 400);
      }}
    >  
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          {fields.map((field) => 
            <Label className="mt-4" key={field.name}>
              <span>{capitalize(field.name)}</span>
              <Field className="mt-1" as={Input} name={field.name} type={field.type || 'text'}/>
              <ErrorMessage name={field.name}>{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
           </Label>
          )}

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
  );
}

export default BaseForm