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
import { EditIcon, TrashIcon } from '../../icons'

function Header({role}) {
  return (
    <TableHeader>
      <tr>
        <TableCell>Name</TableCell>
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
      {dataTable.map((user, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center text-sm">
              <div>
                <p className="font-semibold">{user.name}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm">{user.email}</span>
          </TableCell>
          <TableCell>
            <RoleBadge role={user.role} />
          </TableCell>
          <TableCell>
            {role && (role === 'teamOwner' || role === 'teamAdmin') && (user.role !== 'teamOwner') &&
              <div className="flex items-center space-x-4">
                <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => {e.preventDefault(); onAction(user, 'updateUser')} }>
                  <EditIcon className="w-5 h-5" aria-hidden="true" />
                </Button>
                <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); onAction(user, 'deleteUser')} }>
                  <TrashIcon className="w-5 h-5" aria-hidden="true" />
                </Button>
              </div>
            }
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function TeamUsersTable({users, resultsPerPage, totalResults, onAction, onPageChange, role}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header role={role} />
          <Body dataTable={users} onAction={onAction} role={role} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
