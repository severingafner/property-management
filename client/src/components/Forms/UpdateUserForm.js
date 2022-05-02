import React, { useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userService } from '../../services'
import { AuthContext } from '../../context/AuthContext'
import { Input, Label, HelperText, Button } from '@windmill/react-ui'

function UpdateUserForm({formRef, callback, m_user}) {
  const { user, setUser } = useContext(AuthContext)
  const [saved, setSaved] = useState(false)

  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        username: m_user ? m_user.name : '',
        email: m_user ? m_user.email : '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
      })}
      onSubmit={({ username, email }, { setStatus, setSubmitting }) => {
        setSaved(false)
        setStatus()
        userService.updateUserDetails(m_user.id, username, email)
        .then(
          response => {
            setSaved(true)
            setSubmitting(false)
            if(user.id === m_user.id) setUser(response.data)
            if(callback) callback(response.data)
          },
          error => {
            setSubmitting(false);
            if(error.response) {
              setStatus(error.response.data.message);
            } else {
              setStatus('Some error occured.');
            }
            if(callback) callback(null)
          }
        );
      }}
    >  
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label>
            <span>Name</span>
            <Field className="mt-1" as={Input} name="username" type="text" placeholder="John Doe" />
            <ErrorMessage name="username">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          <Label className="mt-4">
            <span>Email</span>
            <Field className="mt-1" as={Input} name="email" type="email" placeholder="john@doe.com" />
            <ErrorMessage name="email">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          {!formRef && 
            <Button className="mt-6" block type="submit" value="submit" disabled={isSubmitting}>
              Save Details
            </Button> 
          }

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}

          {saved && (
            <HelperText valid={true}>Saved!</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
  )
}

export default UpdateUserForm