import React from 'react'
import ButtonAppBar from '../components/ButtonAppBar';
import '../App.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Homescreen() {
  const navigate = useNavigate()
  return (
    <div className='backgroun-image'>
      <div>
        <ButtonAppBar />
      </div>
      <button type='button' onClick={()=>{navigate('/login')}} className='btn-home'>GET STARTED</button>
    </div>
  )
}
