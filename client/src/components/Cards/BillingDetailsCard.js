import React, { useContext } from 'react'
import { Card, CardBody, Button } from '@windmill/react-ui'
import { EditIcon } from '../../icons'
import { AuthContext } from '../../context/AuthContext'

function BillingDetailsCard({ callback }) {
  const { user } = useContext(AuthContext)

  return (
    <Card className="mb-8">
      <CardBody className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          XXXX-XXXX-XXXX-{user.stripePaymentMethod.last4}
        </p>
        <div>
          <Button icon={EditIcon} layout="link" aria-label="Edit" onClick={(e) => {e.preventDefault(); callback()}} />
        </div>
      </CardBody>
    </Card>
  )
}

export default BillingDetailsCard
