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
import { config } from '../../assets/config/config'
import { EditIcon, TrashIcon } from '../../icons'

function Header({dataHeader}) {
  return (
    <TableHeader>
      <tr>
        {dataHeader.map(header => 
        <TableCell key={header.name}>{header.title}</TableCell>
        )}
        <TableCell>Actions</TableCell>
      </tr>
    </TableHeader>
  )
}
/**
 * 
 * @param {obj} dataTable data for the table cells.
 * @param {obj} rawData all the data of that record. Used to pass the whole record to the action handlers.
 * @returns 
 */
function Body({dataTable, rawData, onAction}) {
  return (
    <TableBody>
      {dataTable.map((dataRow, i) => (
        <TableRow key={i}>
          
          {Object.keys(dataRow).map(key => 
            <TableCell key={key}>
              <span className="text-sm">{dataRow[key]}</span>
            </TableCell>
          )}
          <TableCell>
            <div className="flex items-center space-x-4">
              <Button layout="link" size="icon" aria-label="Edit" onClick={(e) => {e.preventDefault(); if(onAction){onAction(rawData[i], 'upsert')}} }>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); if(onAction){onAction(rawData[i], 'delete')}} }>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function ActionTable({data, totalRows, onAction, onPageChange}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header dataHeader={data.header} />
          <Body dataTable={data.body} rawData={data.rawData} onAction={onAction} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalRows}
            resultsPerPage={config.table.resultsPerPage}
            onChange={onPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
