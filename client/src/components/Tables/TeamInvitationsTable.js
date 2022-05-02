import React from 'react'
import {
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableFooter,
  TableContainer,
  Pagination,
  Button
} from '@windmill/react-ui'
import RoleBadge from '../RoleBadge'
import { TrashIcon } from '../../icons'

function Header({role}) {
  return (
    <TableHeader>
      <tr>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        {role && (role === 'teamOwner' || role === 'teamAdmin') && <TableCell>Actions</TableCell>}
      </tr>
    </TableHeader>
  )
}

function Body({dataTable, onAction, role}) {
  return (
    <TableBody>
      {dataTable.map((invitation, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center text-sm">
              <div>
                <p className="font-semibold">{invitation.email}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <RoleBadge role={invitation.role} />
          </TableCell>
          {role && (role === 'teamOwner' || role === 'teamAdmin') &&
            <TableCell>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); onAction(invitation, 'deleteInvitation')} }>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </TableCell>
          }
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function TeamInvitationsTable({invitations, onAction, role}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header role={role} />
          <Body dataTable={invitations} onAction={onAction} role={role} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={invitations.length}
            resultsPerPage={invitations.length}
            onChange={()=>{}}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
