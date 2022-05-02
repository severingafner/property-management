import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { teamService } from "../../services"
import { Select, Label, HelperText } from '@windmill/react-ui'

function UpdateTeamUserForm({formRef, callback, user, team}) {
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        role: user ? user.role : 'teamUser',
      }}
      validationSchema={Yup.object().shape({
        role: Yup.string().required('Role is required'),
      })}
      onSubmit={({ role }, { setStatus, setSubmitting }) => {
        setStatus()
        teamService.updateUser(team.id, user.id, role)
        .then(
          response => {
            setSubmitting(false)
            callback(response.data)
          },
          error => {
            setSubmitting(false);
            if(error.response) {
              setStatus(error.response.data.message);
            } else {
              setStatus('Some error occured.');
            }
            callback(false)
          }
        );
      }}
    >  
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <Label>
            <span>Role</span>
            <Field className="mt-1" as={Select} name="role">
              <option value="teamUser">User</option>
              <option value="teamAdmin">Admin</option>
            </Field>
          </Label>

          {status && (
            <HelperText valid={false}>{status}</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
  )
}

export default UpdateTeamUserForm