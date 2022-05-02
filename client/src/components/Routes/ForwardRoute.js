import React, { useContext, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'

export default function ForwardRoute(props) {
  const { user } = useContext(AuthContext)
  const { component: Component, ...remProps } = props;
  const [pathname, setPathname] = useState('/app')

  useEffect(() => {
  	const _pathname = window.sessionStorage.getItem('authRedirect')
  	if(_pathname) {
  		setPathname(_pathname)
  	}
  }, [])

  return (
	<Route 
    	{...remProps} 
		render={remProps => (
			user ?
				<Redirect to={pathname} /> :
				<Component {...remProps} />
        )} 
    />
	);
}
