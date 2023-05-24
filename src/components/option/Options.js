import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, InputAdornment, Slider, Stack, TextField } from '@mui/material';
import './Options.css'
import FilterTiltShiftRoundedIcon from '@mui/icons-material/FilterTiltShiftRounded';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import chart from '../../assets/images/chart1.png';
import breath from '../../assets/images/breath.png';
import oxygen from '../../assets/images/oxygen.png';



const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 36.5,
    label: '36.5°C',
  },
  {
    value: 70,
    label: '70°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}


export default function Options() {

  const [heartRate, setHeartRate] = useState("120");
  const [breathRate, setBreathRate] = useState("12");
  const [oxygenPro, setOxygenPro] = useState("95");

  const handleOnchange = (e) => {
    setHeartRate(e.target.value);
  }

  return (
    <div className="bg-white mx-3 wrapper" style={{height:"90vh"}}>
      <div className="row">
        <div className='title'>
          <MedicalInformationIcon color="primary" />
          {' '}Medical Information           
        </div>
        <p className='p1'>provide your medical information for more personalized and informative suggestions.</p>
        <div className="row">
          <Stack spacing={0} direction="row"> 
            <Button variant="outlined" sx={{fontSize: '1rem'}} fullWidth="true">IMPORIAL</Button>
            <Button variant="outlined" sx={{fontSize: '1rem'}} fullWidth="true">METRIC(S1)</Button>
          </Stack>
        </div>
      </div>
      <div className="row">
        <div className='title'>
          <FilterTiltShiftRoundedIcon color="primary"/>
          {' '}Core
        </div>
        <div className='row spc'>
          <div className='col-6'>
            <TextField
              label="Age"
              id="outlined-start-adornment"
              fullWidth="true"
              // sx={{ marginTop: "10px" }}
              InputProps={{
                endAdornment: <InputAdornment position="start">yr</InputAdornment>,
              }}
            />
          </div>
          <div className='col-6'>
            <TextField
              label="Weight"
              id="outlined-start-adornment"
              fullWidth="true"
              // sx={{ m: 1, width: '25ch' }}
              InputProps={{
                endAdornment: <InputAdornment position="start">lb</InputAdornment>,
              }}
            />
          </div>
        </div>
        <div className='row spc'>
          <div className="col-3">
            <TextField
              label="Height"
              id="outlined-start-adornment"
              fullWidth="true"
              // sx={{ m: 1, width: '25ch' }}
              InputProps={{
                endAdornment: <InputAdornment position="start">ft</InputAdornment>,
              }}
            />
          </div>
          <div className="col-3">
            <TextField
              // label="Age"
              id="outlined-start-adornment"
              fullWidth="true"
              InputProps={{
                endAdornment: <InputAdornment position="start">in</InputAdornment>,
              }}
            />
          </div>
          <div className="col-6">
            <TextField
              id="filled-multiline-flexible"
              fullWidth="true"
              label="Symptoms"
              multiline
              maxRows={4}
              variant="filled"
            />
          </div>
        </div>
        <div className='row spc'>
          <div className="col-6">
            <TextField
              id="filled-multiline-flexible"
              fullWidth="true"
              label="Allergies"
              multiline
              maxRows={4}
              variant="filled"
            />
          </div>
          <div className="col-6">
            <TextField
              id="filled-multiline-flexible"
              fullWidth="true"
              label="Medications"
              multiline
              maxRows={4}
              variant="filled"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className='title'>
          <MonitorHeartIcon color="primary" />
          {' '}Patients body stats
        </div>
        <div className="row spc">
          <div className="col-6 ">
            <div className='d-flex'>
              <ThermostatIcon color='primary' fontSize='large' />
              <h4>Temperature</h4>
            </div>
            <div className="slider">
              <Slider
                className="slider"
                aria-label="Always visible"
                defaultValue={36.5}
                getAriaValueText={valuetext}
                step={0.1}
                marks={marks}
                valueLabelDisplay="on"
              />
            </div>
          </div>
          <div className="col-6 heart_container" style={{borderRadius: "20px", background: "#f0f0f0", marginLeft: "0px"}}>
            <div className='d-flex'>
              <div className='heart'> 
                <FavoriteBorderIcon className='icon'/>
              </div>
              <div className='heart_letter'>
                <h4>Heart Rate</h4>
                <h4>{heartRate}bpm</h4>
              </div>
            </div>
            <div className='d-flex m-2 '>
              <div className='chart w-100 justify-content-between'>
                <img src={chart} width="70%" height="60px" style={{marginTop: "35px", marginBottom: "35px"}}/>
                <div className='rate_input'>
                  <input type='text' value={heartRate} onChange={handleOnchange} className='rate_text'/>
                  <h4 style={{padding:"0", margin:"0", color:"white"}}>bpm</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-6 heart_container" style={{borderRadius: "20px", background: "#f0f0f0", marginLeft: "0px"}}>
            <div className='d-flex'>
              <div className='heart breath'> 
                <TrendingDownIcon className='iconb'/>
              </div>
              <div className='heart_letter'>
                <h4>Respiratory Rate</h4>
                <h4>{breathRate}/min</h4>
              </div>
            </div>
            <div className='d-flex m-2 '>
              <div className='chart w-100 justify-content-between'>
                <img src={breath} width="70%" height="60px" style={{marginTop: "35px", marginBottom: "35px"}}/>
                <div className='rate_input breath_input'>
                  <input type='text' value={breathRate} onChange={(e) =>{setBreathRate(e.target.value);}} className='rate_text breath_text'/>
                  <h4 style={{padding:"0", margin:"0", color:"black"}}>/min</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 heart_container" style={{borderRadius: "20px", background: "#f0f0f0", marginLeft: "0px"}}>
            <div className='d-flex'>
              <div className='heart breath'> 
                <EqualizerIcon className='iconb'/>
              </div>
              <div className='heart_letter'>
                <h4>Oxygen Saturation</h4>
                <h4>{oxygenPro}{'(%)'}</h4>
              </div>
            </div>
            <div className='d-flex m-2 '>
              <div className='chart w-100 justify-content-between'>
                <img src={oxygen} width="70%" height="60px" style={{marginTop: "35px", marginBottom: "35px"}}/>
                <div className='rate_input breath_input'>
                  <input type='text' value={oxygenPro} onChange={(e) => {setOxygenPro(e.target.value);}} className='rate_text breath_text'/>
                  <h4 style={{padding:"0", margin:"0", color:"black"}}>{'(%)'}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
