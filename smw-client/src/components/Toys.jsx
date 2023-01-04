import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';


function Toys() {
    const [toys, setToys] = useState([])
    const fetchData = () => {
        return fetch("http://localhost:5000/toys")
            .then((response) => response.json())
            .then((data) => setToys(data))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Description</TableCell>
                        <TableCell >Price</TableCell>
                        {/* <TableCell >Category_Id</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {toys.map((toy) => (
                        <TableRow
                            key={toy._id}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/toys/${toy._id}`}> {toy.name}</Link>
                            </TableCell>
                            <TableCell >{toy.description}</TableCell>
                            <TableCell >{toy.price}</TableCell>
                            {/* <TableCell >{toy.category_id}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default Toys