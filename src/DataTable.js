import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import cx from 'classnames'
import './DataTable.css'

const DataTable = ({
  columns,
  data,
  totalRows,
  rowsPerPage = 25,
  containerHeight,
  dense,
  fluid,
  perPageOptions = [5, 10, 15, 20, 25, 50],
}) => {
  const [numPages, setNumPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [tableRowsPerPage, setTableRowsPerPage] = useState(rowsPerPage)
  const [startIndex, setStartIndex] = useState(0)
  const [pages, setPages] = useState([])
  const [paginationWindow, setPaginationWindow] = useState([1, 1])

  useEffect(() => {
    setStartIndex(parseInt(tableRowsPerPage * (currentPage - 1)))
  }, [currentPage, tableRowsPerPage, setStartIndex])

  useEffect(() => {
    let paginationStart = 0
    let paginationEnd = 0

    if (currentPage <= 3) {
      paginationStart = 1
      paginationEnd = numPages <= 5 ? numPages : 5
    }
    if (currentPage > 3 && currentPage < numPages - 1) {
      paginationStart = currentPage - 2
      paginationEnd = currentPage + 2 <= numPages ? currentPage + 2 : numPages
    }
    if (currentPage === numPages) {
      paginationStart = currentPage - 4 > 1 ? currentPage - 4 : 1
      paginationEnd = numPages
    }

    if (currentPage === numPages - 1) {
      paginationStart = currentPage - 3 > 1 ? currentPage - 3 : 1
      paginationEnd = numPages
    }

    setPaginationWindow([
      pages.indexOf(paginationStart),
      pages.indexOf(paginationEnd) + parseInt(1),
    ])
  }, [currentPage, numPages, pages])

  useEffect(() => {
    setNumPages(parseInt(Math.ceil(totalRows / tableRowsPerPage)))
    const pages = []
    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
      pages.push(pageIndex)
    }
    setPages(pages)

    if (currentPage > numPages) setCurrentPage(numPages)
  }, [
    totalRows,
    tableRowsPerPage,
    currentPage,
    numPages,
    setNumPages,
    setPages,
    setCurrentPage,
  ])

  const handleSelectPerPage = (event) => {
    setTableRowsPerPage(event.target.value)
  }
  const handleSetPage = (page) => {
    if (page === '-1')
      return setCurrentPage((prevCurrentPage) =>
        prevCurrentPage === 1 ? 1 : prevCurrentPage - 1
      )
    if (page === '+1')
      return setCurrentPage((prevCurrentPage) =>
        prevCurrentPage === numPages ? numPages : prevCurrentPage + 1
      )
    setCurrentPage(parseInt(page))
  }
  return (
    <Container fluid={fluid}>
      <Row>
        <div
          className="data-table-container"
          style={{
            height: containerHeight,
            maxHeight: containerHeight,
          }}
        >
          <Table
            className={`data-table-table sticky ${
              dense ? 'data-table-dense' : ''
            }`}
          >
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .slice(
                  startIndex,
                  parseInt(startIndex) + parseInt(tableRowsPerPage)
                )
                .map((row) => (
                  <tr key={row.id}>
                    {columns.map((column, index) => (
                      <td key={`${row.id}_${index}`}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row>
        <Col xs={6} className="d-flex justify-content-start">
          Rows per page
          <Form.Control
            as="select"
            onChange={handleSelectPerPage}
            value={tableRowsPerPage}
            size="sm"
            className="d-inline w-auto"
          >
            {perPageOptions.map((option) => (
              <option>{option}</option>
            ))}
          </Form.Control>
        </Col>
        <Col xs={6} className="d-flex justify-content-end">
          <button
            className="data-table-button-link mr-1"
            onClick={() => handleSetPage('-1')}
          >
            &lt;
          </button>
          {pages.slice(paginationWindow[0], paginationWindow[1]).map((page) => (
            <button
              className={cx(
                'data-table-button-link',
                'mr-1',
                page === currentPage ? 'active' : ''
              )}
              key={page}
              onClick={() => handleSetPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="data-table-button-link mr-1"
            onClick={() => handleSetPage('+1')}
          >
            &gt;
          </button>
        </Col>
      </Row>
    </Container>
  )
}

export default DataTable
