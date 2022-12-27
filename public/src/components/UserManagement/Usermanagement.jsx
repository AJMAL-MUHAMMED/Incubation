import { React } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/material/LinearProgress';
import AppBar from "@mui/material/AppBar";
import { toast } from 'react-toastify';


export default function UserManagement() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        usermanagement()
    }, [])

    async function usermanagement() {

        try {
            const { data } = await axios.get('http://localhost:4000/admin/get-all-user', { withCredentials: true })
            console.log(data);
            if (data.status == true) {
                setUser(data.users)
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function updateUser(id) {
        try {
            const { data } = await axios.post('http://localhost:4000/admin/update-user/' + id, {}, { withCredentials: true })
            if (data.status) {
                usermanagement()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <Typography variant='h4' sx={{ color: 'white', marginBottom: '5px' }}> User Management</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.status ? "Blocked" : "Unblocked"}</TableCell>
                                <TableCell align="center">{row.status ? (<Button variant='contained' color='success' onClick={() => { updateUser(row._id) }}>Unblock</Button>) : (<Button variant='contained' color='error' onClick={() => { updateUser(row._id) }}>Block</Button>)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}