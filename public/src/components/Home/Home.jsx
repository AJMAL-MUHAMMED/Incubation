import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props) {
  let progress, bgcolor, text;
  if (props.value === "New") {
    bgcolor = 'info'
    progress = 0
    text = 'Submitted'
  } if (props.value === 'Pending') {
    bgcolor = 'primary'
    progress = 30
    text = 'Under Progress'
  }
  if (props.value === 'Approved') {
    bgcolor = 'warning'
    progress = 60
    text = 'Approved'
  } if (props.value === 'Booked') {
    bgcolor = 'success'
    progress = 100
    text = 'Completed'
  } if (props.value === 'Declined') {
    bgcolor = 'error'
    progress = 0
    text = 'Declined'

  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} color={bgcolor} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{text}</Typography>
      </Box>
    </Box>
  );
}

function Home() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookies] = useCookies([])
  const [user, setUser] = useState('');
  const [application, setApplication] = useState('');
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getUser() {
      const { data } = await axios.post('http://localhost:4000/get-User', {}, { withCredentials: true })
      if (data.status == true) {
        setUser(data.user)
        if (data.user.application) {
          getApplication(data.user._id);
        }
      } else {
        removeCookies('jwt')
        navigate('/login')
      }
    }

    getUser();

    async function getApplication(id) {
      const { data } = await axios.post('http://localhost:4000/get-application/' + id, {}, { withCredentials: true })
      if (data.status) {
        setApplication(data.application)
      } else {
        toast.error(data.error, { position: 'top-center' });
      }
    }

  }, [cookies,removeCookies,navigate])

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h2" component="div">
          Welcome
        </Typography>
        <Typography variant="h4" sx={{ mb: 1.5, fontFamily: 'serif' }} color="text.secondary">
          {user.name}
        </Typography>
        </CardContent>
      {user.application ? ( <>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={application.status} />
        </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="small" onClick={() =>
          setOpen(true)
        }> View Application </Button>
      </CardActions> </>) : ("") }
    </React.Fragment>
  );

  return (
    <Box sx={{ textAlign: 'center', justifyContent: 'center' }}>
      <Card variant="outlined">{card}</Card>
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
    </Box>

  );
}




export default Home;
