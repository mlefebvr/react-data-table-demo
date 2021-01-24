import React, { useState, useEffect } from 'react'
import './App.css'
import data from './data.json'
import DataTable from './DataTable'
import { Resizable } from 're-resizable'
import 'bootstrap/dist/css/bootstrap.min.css'

const ResizablePanel = ({
  initialHeight = 300,
  initialWidth = '100%',
  children,
}) => {
  const [containerHeight, setContainerHeight] = useState(
    parseInt(initialHeight)
  )

  const handleResizeStop = (event, direction, refToElement, delta) => {
    refToElement.className = 'data-table-opaque'
    setContainerHeight(
      (prevContainerHeight) => prevContainerHeight + delta.height
    )
  }

  const handleResizeStart = (event, direction, refToElement, delta) => {
    refToElement.className = 'data-table-transparent'
  }

  useEffect(() => {
    console.log(
      'initialHeight',
      initialHeight,
      'containerHeight',
      containerHeight,
      'initialWidth',
      initialWidth
    )
  })

  return (
    <Resizable
      onResizeStop={handleResizeStop}
      onResizeStart={handleResizeStart}
      defaultSize={{ height: containerHeight, width: initialWidth }}
      className="data-table-opaque"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { containerHeight })
      )}
    </Resizable>
  )
}

function App() {
  const columns = ['id', 'userId', 'title', 'body']

  return (
    <div className="App">
      <ResizablePanel initialHeight="450">
        <DataTable
          dense={false}
          fluid
          columns={columns}
          totalRows={data.length}
          data={data}
          perPageOptions={[5, 10, 15, 20, 25, 99]}
        />
      </ResizablePanel>
    </div>
  )
}

export default App
