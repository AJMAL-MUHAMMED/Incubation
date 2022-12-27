import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import { useCookies } from 'react-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const pages = ['Add  Application'];
const settings = ['View Application', 'Logout'];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Header = () => {

    const [state, setState] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [use, setUse] = React.useState({ application: false })
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookies] = useCookies([])
    const [open, setOpen] = React.useState(false);
    const [application, setApplication] = React.useState({})


    useEffect(() => {
        async function getUser() {
            if (!cookies.jwt) {
                navigate('/login')
            } else {
                const { data } = await axios.post('http://localhost:4000/get-user', {}, { withCredentials: true })
                if (data.status == true) {
                    setUse(data.user)
                    if (data.user.application) {
                        getApplication(data.user._id);
                    }
                } else {
                    removeCookies("jwt");
                    navigate('/login');
                }
            }
        }
        getUser();
        async function getApplication(id) {
            const { data } = await axios.post('http://localhost:4000/get-application/' + id, {}, { withCredentials: true })
            if (data.status == true) {
                setApplication(data.application)
                console.log(data.application);
            } else {
                toast.error(data.error, { position: 'top-center' })
            }
        }

    }, [cookies, navigate, removeCookies])
    const handleOpenNavMenu = (event) => {
        setState(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setState(null);
    };

    const handleCloseUserMenu = () => {

    };

    const navg = () => {
        navigate('/add-application')

    }
    const handleClickOpen = (menu) => {
        if (menu == settings[0]) {
            setOpen(true);
        } else {
            removeCookies('jwt')
            navigate('/login')

        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        INCUBATION
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={state}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={Boolean(state)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: "none" },
                            }}
                        >
                            {pages.map((page) => {
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            })}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant='h5'
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    {use.application == false ? (
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={navg}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    ) : (<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />)}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={user}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(user)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleClickOpen(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
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
                            <ListItemText primary="What is unique about your solution" secondary={application.solution} />
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
            </Container>
        </AppBar>

    )

}

export default Header;
