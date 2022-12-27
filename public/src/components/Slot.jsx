
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { Button, DialogActions } from '@mui/material';
import './Slot.css'
import { toast } from 'react-toastify';


const emails = ['username@gmail.com', 'user02@gmail.com'];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Slot() {
    const [company, setCompany] = useState('')
    const [application, setApplication] = useState([])
    const [open, setOpen] = useState(false)
    const [slotId, setSlotId] = useState("");
    const [slotnumber, setslot_no] = useState("");
    const [slotSection, setSlotSection] = useState("");
    const [sectionA, setSectionA] = useState([]);
    const [sectionB, setSectionB] = useState([]);
    const [sectionC, setSectionC] = useState([]);
    const [sectionD, setSectionD] = useState([]);

    function handleSlot(id, section, number) {
        setSlotId(id)
        setSlotSection(section)
        setslot_no(number)
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    useEffect(() => {
        async function slots() {
            const { data } = await axios.get('http://localhost:4000/admin/slots', { withCredentials: true })
            if (data.status == true) {
                const A = data.slots.filter((item) => {
                    return item.section == 'A';
                })
                setSectionA(A)

                const B = data.slots.filter((item) => {
                    return item.section == "B";
                })
                setSectionB(B)

                const C = data.slots.filter((item) => {
                    return item.section == 'C';
                })
                setSectionC(C)

                const D = data.slots.filter((item) => {
                    return item.section == 'D';
                })
                setSectionD(D)
            }
        }
        slots()
        getApproved()
    }, [application, toast])

    function changeCompany(id) {
        setCompany(id)
    }

    const handleListItemClick = (value) => {

    };

    async function getApproved() {
        const { data } = await axios.get('http://localhost:4000/admin/get-applications', { withCredentials: true })
        if (data.status == true) {
            const Approved = data.applications.filter((item) => {
                return item.bookingStatus == false && item.status == 'Approved'
            })
            setApplication(Approved)
        }

    }

    async function bookSlot(Id) {
        setOpen(false)
        const { data } = await axios.post('http://localhost:4000/admin/bookSlots', { applicationId: Id, slotId: slotId, slotSection: slotSection, slotNumber: slotnumber }, { withCredentials: true })
        if (data.status == true) {
            getApproved();

        }
    }

    return (
        <section>
            <Box sx={{ flexGrow: 1, marginTop: '4px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {sectionA.map((item, index) => (
                        <Grid item xs={2} sm={3} md={3} key={index}>
                            <Box className={item.selected ? "st" : "ns"} sx={{ height: '150px' }} onClick={() => {
                                return item.selected ? "" : handleSlot(item._id, item.section, item.slot_no)
                            }}>{item.section}-{item.slot_no}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {sectionB.map((item, index) => (
                        <Grid item xs={2} sm={3} md={3} key={index}>
                            <Box className={item.selected ? "st" : "ns"} sx={{ height: '150px' }} onClick={() => {
                                return item.selected ? "" : handleSlot(item._id, item.section, item.slot_no)
                            }}>{item.section}-{item.slot_no}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {sectionC.map((item, index) => (
                        <Grid item xs={2} sm={3} md={3} key={index}>
                            <Box className={item.selected ? "st" : "ns"} sx={{ height: '150px' }} onClick={() => {
                                return item.selected ? "" : handleSlot(item._id, item.section, item.slot_no)
                            }}>{item.section}-{item.slot_no}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                    {sectionD.map((item, index) => (
                        <Grid item xs={2} sm={3} md={3} key={index}>
                            <Box className={item.selected ? "st" : "ns"} sx={{ height: '150px' }} onClick={() => {
                                return item.selected ? "" : handleSlot(item._id, item.section, item.slot_no)
                            }}>{item.section}-{item.slot_no}</Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Select your company name</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {application.length === 0 ? (<p style={{ textAlign: 'center', marginBottom: '10px', opacity: '.3' }}>No Companies Approved</p>) : application.map((item) => (
                        <ListItem button onClick={() => { bookSlot(item._id) }} key={item.name}>
                            <ListItemText primary={item.company} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </section>
    );
}


