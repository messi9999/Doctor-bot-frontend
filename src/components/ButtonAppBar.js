import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';

export default function ButtonAppBar() {
  const {user: currentUser} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logOut = () => {
    dispatch(logout())
  }
  return (
    <>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctor
          </Typography>
          {currentUser ? (<div>
            {/* <Button color="inherit">User Info</Button> */}
            <label className='fs-2 me-5'>{currentUser.username}</label>
            <Button onClick={navigate('/profile')} color="inherit">User Info</Button>
            <Button onClick={logOut} color="inherit">SignOut</Button>
          </div>):(
            <div>
              {/* <Button onClick={()=>{navigate('/login')}} color="primary" sx={{borderRadius:"15px", background:"white"}}>Get Started</Button> */}
              <Button onClick={()=>{navigate('/login')}} color="inherit">Login</Button>
              <Button onClick={()=>{navigate('/register')}} color="inherit">Signup</Button>
            </div>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
