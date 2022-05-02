import React from 'react'
import { Badge } from '@windmill/react-ui'

export default function RoleBadge({role}) {
  switch (role) {
    case 'user' : return <Badge type='neutral'>User</Badge>
    case 'admin' : return <Badge type='primary'>Admin</Badge>
    case 'teamUser' : return <Badge type='neutral'>User</Badge>
    case 'teamAdmin' : return <Badge type='primary'>Admin</Badge>
    case 'teamOwner' : return <Badge type='danger'>Owner</Badge>
    default : return <Badge type='neutral'>User</Badge>
  }
}