import './App.css'
import data from './data.json'
import DataTable from './DataTable'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const columns = ['id', 'userId', 'title', 'body']
  return <DataTable columns={columns} totalRows={data.length} data={data} />
}

export default App
