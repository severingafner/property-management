import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login'))
const CreateAccount = lazy(() => import('../pages/CreateAccount'))

function Auth() {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/create-account" component={CreateAccount} />
      <Redirect from="/auth" to="/auth/login" />
    </Switch>
  )
}

export default Auth
