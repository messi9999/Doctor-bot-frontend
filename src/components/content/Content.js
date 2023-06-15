// import Options from "./option/Options"
// import Chat from "./chat/Chat"

import React, { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import SettingsAccessibilityRoundedIcon from "@mui/icons-material/SettingsAccessibilityRounded";
import AdbRoundedIcon from "@mui/icons-material/AdbRounded";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Button,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  ThemeProvider,
  createTheme,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import FilterTiltShiftRoundedIcon from "@mui/icons-material/FilterTiltShiftRounded";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import chart from "../../assets/images/chart1.png";
import breath from "../../assets/images/breath.png";
import oxygen from "../../assets/images/oxygen.png";
import "./Content.css";
import axios from "axios";
import { ReactComponent as LibraryIcon } from "../../assets/images/icon-library.svg";
import { ReactComponent as MedicalIcon } from "../../assets/images/icon-medical.svg";
import { ReactComponent as CoreIcon } from "../../assets/images/icon-core.svg";
import { ReactComponent as VitalsIcon } from "../../assets/images/icon-vitals.svg";
import { ReactComponent as SharpIcon } from "../../assets/images/icon-button.svg";
import { ReactComponent as LabIcon } from "../../assets/images/icon-lab.svg";

// const BASE_URL = process.env.REACT_APP_BASEURL;

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
  marks: [
    {
      value: 0,
      label: "0°C",
    },
    {
      value: 20,
      label: "20°C",
    },
    {
      value: 36.5,
      label: "36.5°C",
    },
    {
      value: 50,
      label: "50°C",
    },
  ],
};

function valuetext(value) {
  return `${value}°C`;
}

const Content = () => {
  const ref = useRef();
  const [chats, setChats] = useState([]);
  const [ques, setQues] = useState("");

  const [isquestion, setIsquestion] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    setQues(e.target.value);
  };

  const handleSubmit = async () => {
    const chat = {
      isquestion: true,
      content: ques,
    };
    // setIsquestion(true)

    setChats((prevChats) => [...prevChats, chat]);

    /////
    const body = {
      question: ques,
      info: {
        temperature: temperature,
        heartRate: heartRate,
        breathRate: breathRate,
        age: age,
        heightA: heightA,
        heightB: heightB,
        weight: weight,
        allergies: allergies,
        medications: medications,
        symptoms: symptoms,
        oxygenPro: oxygenPro,
      },
    };
    // axios

    const res = await axios.post(
      process.env.REACT_APP_BASEURL + "article",
      body
    );
    // setIsquestion(false)
    const chat1 = {
      isquestion: false,
      content: res.data.answers,
    };

    setChats((prevChats) => [...prevChats, chat1]);

    setQues("");
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ call submit function here
        handleSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [ques]);

  const scrollToBottom = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightA, setHeightA] = useState("");
  const [heightB, setHeightB] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [breathRate, setBreathRate] = useState("");
  const [oxygenPro, setOxygenPro] = useState("");
  const [temperature, setTemperature] = useState("");
  const [waistCir, setWaistCir] = useState("");
  const [sbloodPre, setSbloodPre] = useState("");
  const [hipCir, setHipCir] = useState("");
  const [dbloodPre, setDbloodPre] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [alt, setAlt] = useState("");
  const [ast, setAst] = useState("");
  const [bun, setBun] = useState("");
  const [calcium, setCalcium] = useState("");
  const [glucose, setGlucose] = useState("");
  const [creatinine, setCreatinine] = useState("");
  const [hbalc, setHbalc] = useState("");
  const [potassium, setPotassium] = useState("");
  const [sodium, setSodium] = useState("");
  const [ldl, setLdl] = useState("");
  const [triglycerides, setTriglycerides] = useState("");
  const [hdl, setHdl] = useState("");
  const [egfr, setEgfr] = useState("");

  // const handleOnchange = (e) => {
  //   setHeartRate(e.target.value);
  // }
  const [isShownco, setIsShownco] = useState(true);
  const [isShownvi, setIsShownvi] = useState(true);
  const [isShownlab, setIsShownlab] = useState(true);
  const [isShownCalendar, setIsShownCalendar] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShownco((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div className="row" style={{ width: "100%" }}>
      <div className="col-8 p-0">
        <div className="bg-white m-lg-3">
          <div className="chatContainer" style={{ overflowY: "auto" }}>
            {chats.map((chat, index) => (
              <div key={index} className="chatbox">
                {chat.isquestion ? (
                  <div className="chatq">
                    <div className="box4 sb13">{chat.content}</div>
                    <img
                      src={require("../../assets/images/doctor.png")}
                      style={{
                        marginRight: "80px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="chata">
                    <img
                      src={require("../../assets/images/doctor.png")}
                      style={{
                        marginLeft: "80px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                    <div className="box3 sb14">{chat.content}</div>
                  </div>
                )}
              </div>
            ))}
            <div ref={ref}></div>
          </div>
          <div
            className="d-flex position-fixed message"
            style={{ width: "58%" }}
          >
            <TextField
              id="outlined-basic"
              label="Send a message."
              variant="outlined"
              sx={{ width: "82%", marginLeft: "80px" }}
              value={ques}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            {/* <ThemeProvider theme={theme}> */}
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{
                background:
                  "linear-gradient(180deg, #F3AB82 0%, #E78163 52.08%, #D26B51 99.99%, rgba(224, 119, 90, 0) 100%, rgba(225, 121, 92, 0.0416667) 100%)",
                marginLeft: "20px",
                width: "130px",
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
      <div
        className="col-4 p-0"
        style={{ position: "fixed", top: "105px", right: "0px" }}
      >
        <div className="bg-white mx-3 wrapper">
          <div className="row">
            <div className="title">
              <LibraryIcon /> Dr.Gupta's Library
            </div>
            <button
              className="bt-sche"
              onClick={(e) => {
                setIsShownCalendar((current) => !current);
              }}
            >
              My Schedule{"  "}
              <img src={require("../../assets/images/bt-sche.png")} />
            </button>
            {isShownCalendar ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker orientation="landscape" />
              </LocalizationProvider>
            ) : (
              <Alert severity="info" style={{ marginTop: "15px" }}>
                After you start your conversation, Dr.Gupta will collect
                research materials here.
              </Alert>
            )}
          </div>
          <div className="row">
            <div className="title">
              <MedicalIcon color="primary" /> Medical Information
            </div>
            <div className="txt">
              Provide your medical information for more personalized and
              informative suggestions.
            </div>
          </div>
          <div className="row">
            <div className="title tit-shape">
              <CoreIcon color="primary" /> Core
              <button className="bt-icon" onClick={handleClick}>
                <SharpIcon />
              </button>
            </div>
            {isShownco && (
              <div style={{ margin: "0px", padding: "0px" }}>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      label="Age"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">yr</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={weight}
                      onChange={(e) => {
                        setWeight(e.target.value);
                      }}
                      label="Weight"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">lb</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-3">
                    <TextField
                      value={heightA}
                      onChange={(e) => {
                        setHeightA(e.target.value);
                      }}
                      label="Height"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">ft</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <TextField
                      value={heightB}
                      onChange={(e) => {
                        setHeightB(e.target.value);
                      }}
                      // label="Age"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">in</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={symptoms}
                      onChange={(e) => {
                        setSymptoms(e.target.value);
                      }}
                      id="filled-multiline-flexible"
                      fullWidth={true}
                      label="Symptoms"
                      multiline
                      maxRows={4}
                      variant="filled"
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={allergies}
                      onChange={(e) => {
                        setAllergies(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setMedications(e.target.value);
                      }}
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
            )}
          </div>
          {/* <div className="row">
            <div className="title">
              <VitalsIcon color="primary" /> Vitals
            </div>
            <div className="row spc">
              <div className="col-6 ">
                <div className="d-flex">
                  <ThermostatIcon color="primary" fontSize="large" />
                  <h4>Temperature</h4>
                </div>
                <div className="slider">
                  <Slider
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(e.target.value);
                    }}
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
              <div
                className="col-6 heart_container"
                style={{
                  borderRadius: "20px",
                  background: "#f0f0f0",
                  marginLeft: "0px",
                }}
              >
                <div className="d-flex">
                  <div className="heart">
                    <FavoriteBorderIcon className="icon" />
                  </div>
                  <div className="heart_letter">
                    <h4>Heart Rate</h4>
                    <h4>{heartRate}bpm</h4>
                  </div>
                </div>
                <div className="d-flex m-2 ">
                  <div className="chart w-100 justify-content-between">
                    <img
                      src={chart}
                      width="70%"
                      height="60px"
                      style={{ marginTop: "35px", marginBottom: "35px" }}
                    />
                    <div className="rate_input">
                      <input
                        type="text"
                        value={heartRate}
                        onChange={(e) => {
                          setHeartRate(e.target.value);
                        }}
                        className="rate_text"
                      />
                      <h4 style={{ padding: "0", margin: "0", color: "white" }}>
                        bpm
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-6 heart_container"
                style={{
                  borderRadius: "20px",
                  background: "#f0f0f0",
                  marginLeft: "0px",
                }}
              >
                <div className="d-flex">
                  <div className="heart breath">
                    <TrendingDownIcon className="iconb" />
                  </div>
                  <div className="heart_letter">
                    <h4>Respiratory Rate</h4>
                    <h4>{breathRate}/min</h4>
                  </div>
                </div>
                <div className="d-flex m-2 ">
                  <div className="chart w-100 justify-content-between">
                    <img
                      src={breath}
                      width="70%"
                      height="60px"
                      style={{ marginTop: "35px", marginBottom: "35px" }}
                    />
                    <div className="rate_input breath_input">
                      <input
                        type="text"
                        value={breathRate}
                        onChange={(e) => {
                          setBreathRate(e.target.value);
                        }}
                        className="rate_text breath_text"
                      />
                      <h4 style={{ padding: "0", margin: "0", color: "black" }}>
                        /min
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-6 heart_container"
                style={{
                  borderRadius: "20px",
                  background: "#f0f0f0",
                  marginLeft: "0px",
                }}
              >
                <div className="d-flex">
                  <div className="heart breath">
                    <EqualizerIcon className="iconb" />
                  </div>
                  <div className="heart_letter">
                    <h4>Oxygen Saturation</h4>
                    <h4>
                      {oxygenPro}
                      {"(%)"}
                    </h4>
                  </div>
                </div>
                <div className="d-flex m-2 ">
                  <div className="chart w-100 justify-content-between">
                    <img
                      src={oxygen}
                      width="70%"
                      height="60px"
                      style={{ marginTop: "35px", marginBottom: "35px" }}
                    />
                    <div className="rate_input breath_input">
                      <input
                        type="text"
                        value={oxygenPro}
                        onChange={(e) => {
                          setOxygenPro(e.target.value);
                        }}
                        className="rate_text breath_text"
                      />
                      <h4 style={{ padding: "0", margin: "0", color: "black" }}>
                        {"(%)"}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="title tit-shape">
              <VitalsIcon /> Vitals
              <button
                className="bt-icon"
                onClick={(e) => {
                  setIsShownvi((current) => !current);
                }}
              >
                <SharpIcon />
              </button>
            </div>
            {isShownvi && (
              <div style={{ margin: "0px", padding: "0px" }}>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={temperature}
                      onChange={(e) => {
                        setTemperature(e.target.value);
                      }}
                      label="Temperature"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">F</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={heartRate}
                      onChange={(e) => {
                        setHeartRate(e.target.value);
                      }}
                      label="Heart Rate"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">BPM</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={breathRate}
                      onChange={(e) => {
                        setBreathRate(e.target.value);
                      }}
                      label="Respiratory Rate"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            Breaths per min
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={oxygenPro}
                      onChange={(e) => {
                        setOxygenPro(e.target.value);
                      }}
                      label="Oxygen Saturation"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">lb</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={waistCir}
                      onChange={(e) => {
                        setWaistCir(e.target.value);
                      }}
                      label="Waist Circumference"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">in</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={hipCir}
                      onChange={(e) => {
                        setHipCir(e.target.value);
                      }}
                      label="Hip Circumference"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">in</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={sbloodPre}
                      onChange={(e) => {
                        setSbloodPre(e.target.value);
                      }}
                      label="Systoric Blood Pressure"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={dbloodPre}
                      onChange={(e) => {
                        setDbloodPre(e.target.value);
                      }}
                      label="Diasystoric Blood Pressure"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="title tit-shape">
              <LabIcon /> Lab Test Results
              <button
                className="bt-icon"
                onClick={(e) => {
                  setIsShownlab((current) => !current);
                }}
              >
                <SharpIcon />
              </button>
            </div>
            {isShownlab && (
              <div style={{ margin: "0px", padding: "0px" }}>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={albumin}
                      onChange={(e) => {
                        setAlbumin(e.target.value);
                      }}
                      label="Albumin"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">F</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={alt}
                      onChange={(e) => {
                        setAlt(e.target.value);
                      }}
                      label="ALT"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">BPM</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={ast}
                      onChange={(e) => {
                        setAst(e.target.value);
                      }}
                      label="AST"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            Breaths per min
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={bun}
                      onChange={(e) => {
                        setBun(e.target.value);
                      }}
                      label="BUN"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">lb</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={calcium}
                      onChange={(e) => {
                        setCalcium(e.target.value);
                      }}
                      label="Calcium"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">in</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={creatinine}
                      onChange={(e) => {
                        setCreatinine(e.target.value);
                      }}
                      label="Creatinine"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">in</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={glucose}
                      onChange={(e) => {
                        setGlucose(e.target.value);
                      }}
                      label="Glucose"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={hbalc}
                      onChange={(e) => {
                        setHbalc(e.target.value);
                      }}
                      label="HbAlc"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={potassium}
                      onChange={(e) => {
                        setPotassium(e.target.value);
                      }}
                      label="Potassium"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={sodium}
                      onChange={(e) => {
                        setSodium(e.target.value);
                      }}
                      label="Sodium"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={triglycerides}
                      onChange={(e) => {
                        setTriglycerides(e.target.value);
                      }}
                      label="Triglycerides"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={ldl}
                      onChange={(e) => {
                        setLdl(e.target.value);
                      }}
                      label="LDL"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className="row spc">
                  <div className="col-6">
                    <TextField
                      value={hdl}
                      onChange={(e) => {
                        setHdl(e.target.value);
                      }}
                      label="HDL"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ marginTop: "10px" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextField
                      value={egfr}
                      onChange={(e) => {
                        setEgfr(e.target.value);
                      }}
                      label="eGFR"
                      id="outlined-start-adornment"
                      fullWidth={true}
                      // sx={{ m: 1, width: '25ch' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">mmHg</InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
