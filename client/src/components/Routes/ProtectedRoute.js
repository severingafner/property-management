import React, { useContext, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

export default function ProtectedRoute(props) {
	const { user } = useContext(AuthContext)
  const { component: Component, ...remProps } = props
  const [pathname] = useState(window.location.pathname + window.location.search)

  useEffect(() => {
  	if(user) {
  		window.sessionStorage.removeItem('authRedirect')
  	} else {
  		window.sessionStorage.setItem('authRedirect', pathname)
  	}
  }, [user, pathname])

  return (
	<Route 
    	{...remProps} 
		render={remProps => (
			user ?
				<Component {...remProps} /> :
				<Redirect to='/auth' />
        )} 
    />
	);
}
