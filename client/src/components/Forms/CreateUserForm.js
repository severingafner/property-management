import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userService } from "../../services"
import { Input, Label, Select, HelperText } from '@windmill/react-ui'

function CreateUserForm({formRef, callback}) {
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        username: '',
        email: '',
        password: '',
        role: 'user',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(8)
          .matches('^.*[0-9].*$', 'Atleast one number required')
          .matches('^.*[a-zA-Z].*$', 'Atleast one letter required')
          .required('Password is required'),
        role: Yup.string().required('Role is required'),
      })}
      onSubmit={({ username, email,  password, role }, { setStatus, setSubmitting }) => {
        setStatus();
        setTimeout(async () => {
          await userService.createUser(username, email, password, role.toLowerCase())
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

          <Label className="mt-4">
            <span>Password</span>
            <Field className="mt-1" as={Input} name="password" type="password" placeholder="***************" />
            <ErrorMessage name="password">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
          </Label>

          <Label className="mt-4">
            <span>Role</span>
            <Field className="mt-1" as={Select} name="role">
              <option val="user">User</option>
              <option val="admin">Admin</option>
            </Field>
          </Label>

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
  );
}

export default CreateUserForm