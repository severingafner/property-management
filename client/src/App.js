import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/app" component={Layout} />
          <Route exact path="/" component={Layout} />
          <Redirect from="*" to="/properties" />
        </Switch>
      </Router>
    </>
  )
}

export default App
