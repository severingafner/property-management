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
import { OutlinePersonIcon, EditIcon, TrashIcon } from '../../icons'

function Header() {
  return (
    <TableHeader>
      <tr>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Actions</TableCell>
      </tr>
    </TableHeader>
  )
}

function Body({dataTable, onAction}) {
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
            <div className="flex items-center space-x-4">
              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => {e.preventDefault(); if(onAction){onAction(user, 'updateUser')}} }>
                <OutlinePersonIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Edit Password" onClick={(e) => {e.preventDefault(); if(onAction){onAction(user, 'updatePassword')}} }>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); if(onAction){onAction(user, 'deleteUser')}} }>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function UserTable({users, resultsPerPage, totalResults, onAction, onPageChange}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header />
          <Body dataTable={users} onAction={onAction} />
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
