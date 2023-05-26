import React from 'react'
import ButtonAppBar from '../components/ButtonAppBar';
import '../App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Homescreen() {
  const navigate = useNavigate()
  return (
    <div className='backgroun-image'>
      <ButtonAppBar/>
      {/* <button type='button' onClick={()=>{navigate('/login')}} className='btn-home'>GET STARTED</button> */}
      <Button variant="outlined" color="error" className='btn-home' style={{fontSize:"32px", border:"3px solid rgba(47,19,31,255)", color:"rgba(47,19,31,255)",fontWeight:"bold", borderRadius:"0px"}}
      onClick={()=>{navigate('/login')}}>Get Started</Button>
    </div>
  )
}
