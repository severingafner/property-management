import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { teamService } from "../../services"
import { Input, Label, HelperText, Button } from '@windmill/react-ui'

function UpdateTeamForm({team, callback}) {
  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <Formik
        initialValues={{
          name: team.name,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Team name is required'),
        })}
        onSubmit={({ name }, { setStatus, setSubmitting }) => {
          setStatus();
          setTimeout(async () => {
            await teamService.updateTeam(team.id, name)
              .then(
                response => {
                  callback(response.data.user, response.data.team);
                },
                error => {
                  if(error.response) {
                    setStatus(error.response.data.message);
                  } else {
                    setStatus('Some error occured.');
                  }
                  setSubmitting(false);
                }
              );
          }, 400);
        }}
      >  
        {({ errors, status, touched, isSubmitting }) => (
          <Form>
            <Label>
              <span>Name</span>
              <Field className="mt-1" as={Input} name="name" type="text" placeholder="My Team" />
              <ErrorMessage name="name">{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
            </Label>

            <Button className="mt-6" block type="submit" value="submit" disabled={isSubmitting}>
              Update Team
            </Button>
            {status && (
              <HelperText valid={false}>{status}</HelperText>
            )}
            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateTeamForm