import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function DisplayToy(props) {

    const [toy, setToy] = useState({})
    const params = useParams()
    // console.log(params)

    const fetchToy = async () => {

        const response = await fetch(`http://localhost:5000/toys/${params.id}`)
        try {
            const data = await response.json()
            setToy(data)
            console.log(toy)
        } catch (error) {
            console.log(error)
        }
        // .then((response) => {
        //     //console.log(response)
        //     response.json()
        // })
        // .then((data) => {

        //     setToy(data)
        //     console.log(toy)
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // })

        // console.log(params.id)
    }

    useEffect(() => {
        fetchToy()
    })

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Description</TableCell>
                        <TableCell >Price</TableCell>
                        <TableCell >Category_Id</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={toy._id} >
                        <TableCell component="th" scope="row"> {toy.name}</TableCell>
                        <TableCell >{toy.description}</TableCell>
                        <TableCell >{toy.price}</TableCell>
                        <TableCell >{toy.category_id}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

