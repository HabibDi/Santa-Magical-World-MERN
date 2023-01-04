import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css'

function App() {
  const [toys, setToys] = useState([])
  const [categories, SetCategories] = useState([])

  const fetchData = () => {
    return fetch("http://localhost:5000/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">

      <TableContainer>
        <Table /*sx={{minWidth: 650}}*/>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell >Description</TableCell>
              <TableCell >Price</TableCell>
              <TableCell >Category_Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toys.map((toy) => (
              <TableRow
                key={toy._id}
              /*sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/
              >
                <TableCell component="th" scope="row">
                  {toy.name}
                </TableCell>
                <TableCell >{toy.description}</TableCell>
                <TableCell >{toy.price}</TableCell>
                <TableCell >{toy.category_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default App
