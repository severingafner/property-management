import React, { useState, useEffect } from 'react'

import {
  Table,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui'

function WrapBody({body, dataTable}) {
  return React.cloneElement(body, { dataTable: dataTable });
}

function PaginatedTable({response, resultsPerPage, header, body}) {
  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState([])

  const totalResults = response.length

  // pagination change control
  function onPageChangeTable(p) {
    setPageTable(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable])

  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          {header}
          <WrapBody body={body} dataTable={dataTable} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default PaginatedTable
