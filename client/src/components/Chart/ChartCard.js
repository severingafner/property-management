import React from 'react'
import { Card } from '@windmill/react-ui'

function Chart({ children, title }) {
  return (
    <Card className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">{title}</p>
      {children}
    </Card>
  )
}

export default Chart
