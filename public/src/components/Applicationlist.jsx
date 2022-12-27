import * as React from 'react';
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
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from "@mui/material/AppBar";
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Applicationlist() {
    const [status, setStatus] = useState(false)
    const [application, setApplication] = useState({})
    const [applications, setApplications] = useState('')
    const [pending, setPending] = useState([])
    const [newList, setNewList] = useState([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        async function getApplications() {
            try {
                const { data } = await axios.get('http://localhost:4000/admin/get-applications', { withCredentials: true })
                console.log(data);
                if (data.status == true) {
                    setApplications(data.applications)
                    const newApplication = data.applications.filter((item) => {
                        return item.status == 'New'
                    })
                    const pendingApplication = data.applications.filter((item) => {
                        return item.status == 'Pending'
                    })

                    setPending(pendingApplication)
                    setNewList(newApplication)

                }
            } catch (error) {
                console.log(error);
            }
        }
        getApplications();
    }, [status, toast])

    const changeStatus = async (status, applicationId) => {
        const { data } = await axios.post('http://localhost:4000/admin/change-status', { status: status, applicationId: applicationId }, { withCredentials: true })
        if (data.status == true) {
            setStatus(!status)
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <section>
            <Typography variant='h4' sx={{ color: 'white', marginBottom: '5px' }}> New Application List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">Company Details</TableCell>
                            <TableCell align="center">View</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newList.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.company}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center"><Button variant='contained' onClick={() => { setApplication(row); setOpen(true) }}>View</Button></TableCell>
                                <TableCell align="center"><Button variant='contained' onClick={() => { changeStatus("Pending", row._id); setStatus(!status) }}>Pending</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider sx={{ margin: '10px' }} />
            <Typography variant='h4' sx={{ color: 'white', marginBottom: '5px', marginTop: '10px' }}> New Pending List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">Company Details</TableCell>
                            <TableCell align="center">View</TableCell>
                            <TableCell align="center">Approve</TableCell>
                            <TableCell align="center">Decline</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pending.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.company}</TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center"><Button variant='contained' onClick={() => { setApplication(row); setOpen(true) }}>View</Button></TableCell>
                                <TableCell align="center"><Button variant='contained' color='success' onClick={() => { changeStatus("Approved", row._id); setStatus(!status) }}>Approved</Button></TableCell>
                                <TableCell align="center"><Button variant='contained' color='error' onClick={() => { changeStatus("Declined", row._id); setStatus(!status) }}>Declined</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Application
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Name" secondary={application.name} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Address " secondary={application.address} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Company Name " secondary={application.company} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Email" secondary={application.email} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Explian your marketing strategy" secondary={application.strategy} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="What  is unique about your solution" secondary={application.solution} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Revenue model" secondary={application.revenue} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Type of incupation" secondary={application.type} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Slot Number" secondary={application.slotNum} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Slot Section" secondary={application.section} />
                    </ListItem>
                    <Divider />

                </List>
            </Dialog>
        </section>
    );
}

