import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import cx from 'classnames'
import './DataTable.css'

const DataTable = ({ columns, data, totalRows, rowsPerPage = 25 }) => {
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
    <Container>
      <Row className="p-0 m-0">
        <div className="table-container">
          <Table className="table sticky">
            <thead>
              <tr>
                <th>#</th>
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
                .map((row, index) => (
                  <tr key={row.id}>
                    <td>{index}</td>
                    {columns.map((column) => (
                      <td>{row[column]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row className="justify-content-between align-items-center">
        <Col xs={3}>
          Rows
          <Form.Control
            as="select"
            onChange={handleSelectPerPage}
            value={tableRowsPerPage}
            size="sm"
            className="d-inline w-auto"
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </Form.Control>
        </Col>
        <Col xs={3} className="d-flex justify-content-end">
          <button className="link mr-1" onClick={() => handleSetPage('-1')}>
            &lt;
          </button>
          {pages.slice(paginationWindow[0], paginationWindow[1]).map((page) => (
            <button
              className={cx(
                'link',
                'mr-1',
                page === currentPage ? 'active' : ''
              )}
              key={page}
              onClick={() => handleSetPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="link mr-1" onClick={() => handleSetPage('+1')}>
            &gt;
          </button>
        </Col>
      </Row>
    </Container>
  )
}

export default DataTable
