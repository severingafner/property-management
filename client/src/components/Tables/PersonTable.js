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
import { config } from '../../assets/config/config'
import { OutlinePersonIcon, EditIcon, TrashIcon } from '../../icons'

function Header() {
  return (
    <TableHeader>
      <tr>
        <TableCell>Prename</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Actions</TableCell>
      </tr>
    </TableHeader>
  )
}

function Body({dataTable, onAction}) {
  return (
    <TableBody>
      {dataTable.map((person, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center text-sm">
              <div>
                <p className="font-semibold">{person.prename}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <span className="text-sm">{person.name}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{person.email}</span>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-4">
              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => {e.preventDefault(); if(onAction){onAction(person, 'upsert')}} }>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); if(onAction){onAction(person, 'delete')}} }>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function PersonTable({persons, totalResults, onAction, onPageChange}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header />
          <Body dataTable={persons} onAction={onAction} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={config.table.resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
