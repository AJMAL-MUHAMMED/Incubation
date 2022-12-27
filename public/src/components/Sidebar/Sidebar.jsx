import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const drawerWidth = 240;
export default function SideBar({ children }) {
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("adminToken")
    navigate('/admin/login')
  }

  useEffect(() => {
    async function verifyAdmin() {
      let token = localStorage.getItem("adminToken")
      if(!token){
        navigate("/admin/login")
      }else{
      const { data } = await axios.post('http://localhost:4000/admin/verify', {token:token}, { withCredentials: true })
      if (data.status == false) {
        navigate('/admin/login')
      }
    }
  }
    verifyAdmin()
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key={'Application List'} disablePadding>
              <ListItemButton onClick={() => {
                navigate('/admin/applicationList')
              }}>
                <ListItemText primary={'Application List'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'All Application List'} disablePadding>
              <ListItemButton onClick={() => {
                navigate('/admin/allapplication')
              }}>
                <ListItemText primary={'All Application List'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'Application Slots'} disablePadding>
              <ListItemButton onClick={() => {
                navigate('/admin/slots')
              }}>
                <ListItemText primary={'Application Slots'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'User Management'} disablePadding>
              <ListItemButton onClick={() => {
                navigate('/admin/user-management')
              }}>
                <ListItemText primary={'User Management'} />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem key={'Logout'} disablePadding>
              <ListItemButton onClick={ ()=>{
                logOut()
              }}>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
