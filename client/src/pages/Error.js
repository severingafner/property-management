import React from 'react'
import { Link } from 'react-router-dom'

import { ForbiddenIcon } from '../icons'

function PageError({message}) {
  return (
    <div className="flex flex-col items-center">
      <ForbiddenIcon className="w-12 h-12 mt-8 text-purple-200" aria-hidden="true" />
      <h1 className="text-6xl font-semibold text-gray-700 dark:text-gray-200">Error</h1>
      <p className="text-gray-700 dark:text-gray-300">
        {message && message}{' '}
        <Link className="text-purple-600 hover:underline dark:text-purple-300" to="/app">
          Go back
        </Link>
        .
      </p>
    </div>
  )
}

export default PageError
