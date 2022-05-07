import React from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input, Select, Label, HelperText, Button } from '@windmill/react-ui'
import capitalize from '../../utils/capitalize'

function BaseForm({fields, submitCb, callback}) {
  const initialValues = {}
  const validationSchema = {};
  fields.forEach((field) => {
    initialValues[field.name] = field.default;
    validationSchema[field.name] = field.validation
  });
  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape(validationSchema)}
      onSubmit={(data, { setStatus, setSubmitting }) => {
        setStatus();
        setTimeout(async () => {
          await submitCb(data)
          .then(response => {
            callback(data);
            setSubmitting(false);
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
      {props => (
        <Form>
          {fields.map((field) => {
            if(field.condition) {
              const [name, value] = field.condition.split(':');
              if(props.values[name] !== value) {
                return;
              }
            }
            if(!field.type || field.type === 'email' || field.type === 'date') {
              return (<Label className="mt-4" key={field.name}>
                <span>{capitalize(field.name)}</span>
                <Field className="mt-1" as={Input} name={field.name} type={field.type || 'text'}/>
                <ErrorMessage name={field.name}>{msg => <HelperText valid={false}>{msg}</HelperText>}</ErrorMessage>
              </Label>)
            }
            // 
            if(field.type === 'dropdown') {
              return (
                <Label className="mt-4" key={field.name}>
                  <span>{capitalize(field.name)}</span>
                  <Field as={Select} name={field.name} className="mt-1">
                  {field.values.map((value, i) => {
                    return (<option key={i} value={value}>{value}</option>);
                  })}
                  </Field>
                </Label>
              )
            }
            if(field.type === 'radio') {
              return (
                <div className="mt-4" key={field.name}>
                  <Label>{capitalize(field.name)}</Label>
                  <div className="mt-2" role="group">
                    {field.values.map((value, i) => {
                      return (
                      <Label className={0 < i? 'ml-6': ''} radio key={i}>
                        <Field as={Input} type="radio" value={value} name={field.name} />
                        <span className="ml-2">{value}</span>
                      </Label>)
                    })}
                  </div>
                </div>
              )
            }
            if(field.type === 'checkbox') {
              return (
                <Label className="mt-6" check>
                  <Field type="checkbox" name={field.name} />
                  <span className="ml-2">
                    {field.title}
                  </span>
                </Label>
              )
            }
            return '';
          }
          )}

          <Button className="mt-6" block type="submit" value="submit" disabled={props.isSubmitting}>Save</Button>
          {props.status && (
            <HelperText valid={false}>{props.status}</HelperText>
          )}
          
        </Form>
      )}
    </Formik>
    </div>
  );
}

export default BaseForm