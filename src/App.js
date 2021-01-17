import { useState, useEffect } from 'react'
import './App.css'
import data from './data.json'
import DataTable from './DataTable'
import { Resizable } from 're-resizable'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [containerHeight, setContainerHeight] = useState(300)
  const columns = ['id', 'userId', 'title', 'body']

  const handleResizeStop = (event, direction, refToElement, delta) => {
    refToElement.className = 'opaque'
    setContainerHeight(
      (prevContainerHeight) => prevContainerHeight + delta.height
    )
  }

  const handleResizeStart = (event, direction, refToElement, delta) => {
    refToElement.className = 'transparent'
  }

  useEffect(() => {
    console.log('height', containerHeight)
  }, [containerHeight])
  return (
    <div className="App">
      <Resizable
        onResizeStop={handleResizeStop}
        onResizeStart={handleResizeStart}
        className="opaque"
      >
        <DataTable
          containerHeight={containerHeight}
          columns={columns}
          totalRows={data.length}
          data={data}
        />
      </Resizable>
    </div>
  )
}

export default App
