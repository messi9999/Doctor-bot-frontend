// import Options from "./option/Options"
// import Chat from "./chat/Chat"

import React, { useEffect, useState, useRef } from 'react'
import SendIcon from '@mui/icons-material/Send';
import SettingsAccessibilityRoundedIcon from '@mui/icons-material/SettingsAccessibilityRounded';
import AdbRoundedIcon from '@mui/icons-material/AdbRounded';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, InputAdornment, Slider, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
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
import './Content.css';
import axios from 'axios'

const BASE_URL = "http://localhost:5000/"

// const theme =  createTheme({
//     components: {
//       MuiButton: {
//         styleOverrides: {
//             root: {
//             marginLeft: "30px",
//             },
//         },
//       },
//     },
// });

const marks = {
    "marks": [
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
          value: 50,
          label: '50°C',
        },
    ]
}
  
function valuetext(value) {
    return `${value}°C`;
}
  

const Content = () => {
    const ref = useRef();
    const [chats, setChats] = useState([])
    const [ques, setQues] = useState("")

    const [isquestion, setIsquestion] = useState(false) 

    const handleOnChange = (e) => {
        e.preventDefault();
        setQues(e.target.value)
    }

    const handleSubmit = async () => {
        const chat = {
            "isquestion": true,
            "content": ques
        }
        // setIsquestion(true)
 
        setChats(prevChats => [...prevChats, chat])

        

        /////
        const body = {
            "question" : ques,
            "info" : {
                "temperature": temperature,
                "heartRate" : heartRate,
                "breathRate" : breathRate,
                "age":age,
                "heightA": heightA,
                "heightB": heightB,
                "weight": weight,
                "allergies": allergies,
                "medications": medications,
                "symptoms": symptoms,
                "oxygenPro": oxygenPro
            }
        }
        // axios

        const res = await axios.post(BASE_URL+"api/article", body)
        // setIsquestion(false)
        const chat1 = {
            "isquestion": false,
            "content": res.data.answers
        }

        setChats(prevChats => [...prevChats, chat1])
       
        setQues('')
    }

    useEffect(() => {
        const keyDownHandler = event => {

        if (event.key === 'Enter') {
            
            event.preventDefault();

            // 👇️ call submit function here
            handleSubmit();
        }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
        document.removeEventListener('keydown', keyDownHandler);
        };
    }, [ques]);

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(()=> {
        scrollToBottom()
    }, [chats])

    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [heightA, setHeightA] = useState("");
    const [heightB, setHeightB] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [allergies, setAllergies] = useState("");
    const [medications, setMedications] = useState("");
    const [heartRate, setHeartRate] = useState("120");
    const [breathRate, setBreathRate] = useState("12");
    const [oxygenPro, setOxygenPro] = useState("95");
    const [temperature, setTemperature] = useState("36.5");
  
    // const handleOnchange = (e) => {
    //   setHeartRate(e.target.value);
    // }

    return (
        <div className="row" style={{width:"100%"}}>
            <div className="col-7 p-0" >
                <div className="bg-white m-lg-3" >      
                    <div className='chatContainer' style={{overflowY: "auto"}}>
                        {chats.map((chat, index) => (
                            <div key={index} className='chatbox'>
                            {chat.isquestion ? (                 
                                <div className='chatq'>
                                    <div className='box4 sb13'>{chat.content}</div>
                                    {' '} :
                                    <SettingsAccessibilityRoundedIcon color="primary" fontSize="large" />
                                </div> 
                            ) : (                  
                                <div className='chata'>
                                    <AdbRoundedIcon color="primary" fontSize="large" />
                                    {' '} :
                                    <div className='box3 sb14'>{chat.content}</div>
                                </div>
                            )}
                            </div>
                        ))}
                        <div ref={ref}></div>
                        
                    </div>
                    <div className="d-flex position-fixed message" style={{width: "58%"}} >
                        <TextField id="outlined-basic"  label="Send a message." variant="outlined" sx={{width: "80%", marginLeft: "30px"}} value={ques} onChange={(e) => {handleOnChange(e)}} />
                        {/* <ThemeProvider theme={theme}> */}
                            <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                        {/* </ThemeProvider> */}
                    </div>
                </div>
            </div>
            <div className="col-5 p-0" style={{position: "fixed", top:"64px", right: "0px"}} >
                <div className="bg-white mx-3 wrapper">
                    {/* <div className="row">
                        <div className='title'>
                        <MedicalInformationIcon color="primary" />
                        {' '}Medical Information           
                        </div>
                        <p className='p1'>provide your medical information for more personalized and informative suggestions.</p>
                        <div className="row">
                        <Stack spacing={0} direction="row"> 
                            <Button variant="outlined" sx={{fontSize: '1rem'}} fullWidth={true}>IMPORIAL</Button>
                            <Button variant="outlined" sx={{fontSize: '1rem'}} fullWidth={true}>METRIC(S1)</Button>
                        </Stack>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className='title'>
                        <FilterTiltShiftRoundedIcon color="primary"/>
                        {' '}Core
                        </div>
                        <div className='row spc'>
                            <div className='col-6'>
                                <TextField
                                value={age}
                                onChange={(e) =>{setAge(e.target.value);}}
                                label="Age"
                                id="outlined-start-adornment"
                                fullWidth={true}
                                // sx={{ marginTop: "10px" }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">yr</InputAdornment>,
                                }}
                                />
                            </div>
                            <div className='col-6'>
                                <TextField
                                value={weight}
                                onChange={(e) =>{setWeight(e.target.value);}}
                                label="Weight"
                                id="outlined-start-adornment"
                                fullWidth={true}
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
                                value={heightA}
                                onChange={(e) =>{setHeightA(e.target.value);}}
                                label="Height"
                                id="outlined-start-adornment"
                                fullWidth={true}
                                // sx={{ m: 1, width: '25ch' }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">ft</InputAdornment>,
                                }}
                                />
                            </div>
                            <div className="col-3">
                                <TextField
                                value={heightB}
                                onChange={(e) =>{setHeightB(e.target.value);}}
                                // label="Age"
                                id="outlined-start-adornment"
                                fullWidth={true}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">in</InputAdornment>,
                                }}
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                value={symptoms}
                                onChange={(e) =>{setSymptoms(e.target.value);}}
                                id="filled-multiline-flexible"
                                fullWidth={true}
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
                                value={allergies}
                                onChange={(e) =>{setAllergies(e.target.value);}}
                                id="filled-multiline-flexible"
                                fullWidth={true}
                                label="Allergies"
                                multiline
                                maxRows={4}
                                variant="filled"
                                />
                            </div>
                            <div className="col-6">
                                <TextField
                                value={medications}
                                onChange={(e) =>{setMedications(e.target.value);}}
                                id="filled-multiline-flexible"
                                fullWidth={true}
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
                                    value={temperature}
                                    onChange={(e) => {setTemperature(e.target.value);}}
                                    className="slider"
                                    max={50}
                                    aria-label="Always visible"
                                    // defaultValue={36.5}
                                    getAriaValueText={valuetext}
                                    step={0.1}
                                    marks={marks.marks}
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
                                <input type='text' value={heartRate} onChange={(e) =>{setHeartRate(e.target.value);}} className='rate_text'/>
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
            </div>
        </div>
    )
}

export default Content;
