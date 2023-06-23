import React from "react";

import "./Content.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chatanswer from "../Chatanswer";
import Chatquestion from "../Chatquestion";

import { ReactComponent as SendVector } from "../../assets/logos/SendVector.svg";
import { ReactComponent as BookLogo } from "../../assets/logos/BookLogo.svg";
import { ReactComponent as WarningLogo } from "../../assets/logos/WarningLogo.svg";
import { ReactComponent as MedicalLogo } from "../../assets/logos/MedicalLogo.svg";
import { ReactComponent as CoreLogo } from "../../assets/logos/CoreLogo.svg";
import { ReactComponent as VitalsLogo } from "../../assets/logos/VitalsLogo.svg";
import { ReactComponent as LabLogo } from "../../assets/logos/LabLogo.svg";
import { ReactComponent as DropVector } from "../../assets/logos/DropVector.svg";
import { ReactComponent as ScheduleBtn } from "../../assets/logos/ScheduleBtn.svg";
import { ReactComponent as ScheduleVector } from "../../assets/logos/ScheduleVector.svg";
import { ReactComponent as CalendarVector } from "../../assets/logos/CalendarVector.svg";

import { useState } from "react";
import { useEffect, useRef } from "react";

import { Box, InputAdornment, TextField } from "@mui/material";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// const BASE_URL = "http://localhost:5000/";

const res = {
  data: {
    numSMS: 10,
    answer: "How are you?"
  }
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const Content = () => {
  const [numSms, setNumSms] = useState(0);
  const [question, setQuestion] = useState("");
  const [tques, setTques] = useState("");
  const [answer, setAnswer] = useState("");
  const [chats, setChats] = useState([]);
  const [iswaiting, setIswaiting] = useState(false);

  const [isSchedule, setIsSchedule] = useState(false);
  const [iscore, setIscore] = useState(false);
  const [isvitals, setIsvitals] = useState(false);
  const [islab, setIslab] = useState(false);

  const [date, setDate] = useState(new Date());

  const ref = useRef();
  const ref2 = useRef();
  const scrollToBottom1 = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBottom2 = () => {
    ref2.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    setAnswer(res.data.answer);
    scrollToBottom1();
  }, [chats]);
  useEffect(() => {
    scrollToBottom2();
  }, [question]);

  useEffect(() => {
    const textarea = document.getElementById("myTextarea");
    const content = document.getElementById("content");

    const adjustTextareaHeight = () => {
      textarea.style.height = "auto"; // Reset the height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content

      content.style.height = "auto"; // Reset the height to auto
      content.style.height = `${content.scrollHeight}px`; // Set the height to match the content
    };

    textarea.addEventListener("input", adjustTextareaHeight);

    return () => {
      textarea.removeEventListener("input", adjustTextareaHeight);
    };
  }, []);

  const handleOnInputChange = (e) => {
    e.preventDefault();
    setQuestion(e.target.value);
    setTques(e.target.value);
  };

  const handleOnSend = async () => {
    setIswaiting(true);
    const chat_question = {
      key: false,
      content: question
    };
    setQuestion("");
    setChats((chats) => [...chats, chat_question]);

    /*
    Axios here
    */

    await sleep(1000);
    setNumSms(res.data.numSMS);
    setAnswer(res.data.answer);
    await sleep(500);

    const chat_answer = {
      key: true,
      content: answer
    };
    setChats((chats) => [...chats, chat_answer]);
    setIswaiting(false);
  };

  return (
    <>
      <div id="content" className="row p-0">
        <div className="chat-content col-8 p-0">
          <div className="chat-show">
            {chats.map((chat, index) => {
              return (
                <div key={index}>
                  {chat.key ? (
                    <div>
                      <Chatanswer content={chat.content} />
                    </div>
                  ) : (
                    <Chatquestion content={chat.content} />
                  )}
                </div>
              );
            })}
            <div ref={ref} />
          </div>
          <div className="chat-credit-tip">
            <span style={{ marginRight: "20px" }}>
              <WarningLogo />
            </span>
            <span>{numSms}&nbsp;</span>
            <label>messages left.&nbsp;</label>
            <a href="/register">Signup for free</a>

            <label>
              &nbsp;to send more messages. Message limits will reset on the
              first day of each month.
            </label>
          </div>
          <div className="chat-question d-flex flex-row justify-content-between align-items-end gap-2">
            <div className="chat-ques-input">
              <textarea
                id="myTextarea"
                rows={1}
                onChange={handleOnInputChange}
                placeholder="Send message"
                value={question}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    if (
                      !iswaiting ||
                      !(tques.replace(/(\r\n|\n|\r)/gm, "").trim() === "")
                    ) {
                      handleOnSend();
                    }
                  }
                }}
              />
            </div>
            <div>
              <button
                className="send-btn"
                onClick={handleOnSend}
                disabled={
                  iswaiting || tques.trim().replace(/[\r\n]+/gm, "") === ""
                }
              >
                Send
                <span className="ms-2">
                  <SendVector />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 m-0 p-0">
          <div className="options">
            <div className="option-booking">
              <div className="book-main">
                <div className="book-main-sub">
                  <BookLogo />
                  <label>Dr. Gupta’s Library</label>
                </div>
                <div>
                  <ScheduleBtn
                    onClick={() => {
                      setIsSchedule(!isSchedule);
                    }}
                  />
                </div>
              </div>
              {isSchedule && (
                <div className="mt-3">
                  <div className="calendar-title">
                    <ScheduleVector />
                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                      <CalendarVector />
                      <div className="d-flex flex-column">
                        <label>Next Checkup</label>
                        <label>Sat,04 June</label>
                      </div>
                    </div>
                  </div>
                  <Calendar
                    onChange={setDate}
                    value={date}
                    calendarType="US"
                    className="w-100 mt-3 border-0"
                  />
                </div>
              )}
              <div className="book-tip">
                <span>
                  <WarningLogo />
                </span>
                <label>
                  After you start your conversation, Dr. Gupta will collect
                  research materials here.
                </label>
              </div>
            </div>
            <div className="option-medical-info">
              <div>
                <div className="medical-info-title">
                  <span>
                    <MedicalLogo />
                  </span>
                  <label>Medical Information</label>
                </div>
                <div className="medical-info-description">
                  <label>
                    Provide your medical information for more personalized and
                    informative suggestions.
                  </label>
                </div>
                <div className="medical-info-btn">
                  <label className="switch-imperial">IMPERIAL</label>
                  <label className="switch-metric">METRIC&nbsp;(SI)</label>
                </div>
                <div className="medical-info-drop1">
                  <div
                    className="drop-title"
                    onClick={() => {
                      setIscore(!iscore);
                    }}
                  >
                    <CoreLogo />
                    <DropVector />
                  </div>
                  {iscore && (
                    <div className="drop-body">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Age"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    yr
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Weight"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    lb
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <div className="row d-flex justify-content-between w-100 ms-0 mb-0 me-0 gap-3">
                              <div className="col w-100 m-0 p-0">
                                <TextField
                                  label="Height"
                                  id="outlined-start-adornment"
                                  focused
                                  color="grey"
                                  sx={{ width: "100%" }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start">
                                        ft
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </div>
                              <div className="col w-100 m-0 p-0">
                                <TextField
                                  id="outlined-start-adornment"
                                  focused
                                  color="grey"
                                  sx={{ width: "100%" }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start">
                                        in
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Symptoms"
                              sx={{ width: "100%" }}
                              variant="filled"
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Allergies"
                              sx={{ width: "100%" }}
                              variant="filled"
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Medication"
                              sx={{ width: "100%" }}
                              variant="filled"
                            />
                          </div>
                        </div>
                      </Box>
                    </div>
                  )}
                </div>
                <div
                  className="medical-info-drop2"
                  onClick={() => {
                    setIsvitals(!isvitals);
                  }}
                >
                  <div className="drop-title">
                    <VitalsLogo />
                    <DropVector />
                  </div>
                  {isvitals && (
                    <div className="drop-body">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Temperature"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    F
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Heart Rate"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    BPM
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Respiratory Rate"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    Breaths per min
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Oxygen Saturation"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    lb
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Waist Circumference"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    in
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Hip Circumference"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    in
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Systolic Blood Pressure"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Diasystolic Blood Pressure"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                      </Box>
                    </div>
                  )}
                </div>
                <div
                  className="medical-info-drop3"
                  onClick={() => {
                    setIslab(!islab);
                  }}
                >
                  <div className="drop-title">
                    <LabLogo />
                    <DropVector />
                  </div>
                  {islab && (
                    <div className="drop-body">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Albumin"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    F
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="ALT"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    BPM
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="AST"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    Breaths per min
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="BUN"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    lb
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Calcium"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    in
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Creatinine"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    in
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Glucose"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="HbA1c"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Potassium"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="Sodium"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="Triglycerides"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="LDL"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-flex justify-content-between w-100 ms-0 mb-0 gap-3"
                          style={{ marginTop: "23px" }}
                        >
                          <div className="col d-flex justify-content-center align-items-center w-100 m-0 p-0">
                            <TextField
                              label="HDL"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px"
                              }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                          <div className="col w-100 m-0 p-0">
                            <TextField
                              label="eGFR"
                              id="outlined-start-adornment"
                              focused
                              color="grey"
                              sx={{ width: "100%" }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    mmHg
                                  </InputAdornment>
                                )
                              }}
                            />
                          </div>
                        </div>
                      </Box>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={ref2} />
    </>
  );
};

export default Content;
