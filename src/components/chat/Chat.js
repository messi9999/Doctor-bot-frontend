import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, ThemeProvider, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SettingsAccessibilityRoundedIcon from "@mui/icons-material/SettingsAccessibilityRounded";
import AdbRoundedIcon from "@mui/icons-material/AdbRounded";
import "./Chat.css";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginLeft: "30px"
        }
      }
    }
  }
});

export default function Chat() {
  // const initialChat = { answer: "Hello" };
  const [chats, setChats] = useState([]);
  const [ques, setQues] = useState("");

  const [isloading, setIsloading] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();
    setQues(e.target.value);
  };

  const handleSubmit = () => {
    var chat = {
      isquestion: true,
      content: ques
    };
    setIsloading(true);
    setChats([...chats, chat]);
    console.log("ques", ques);
    console.log("chat", chat);
    setQues("");
    // axios
    // const res = "hello"
    // setIsloading(false)
    // chat = {
    //     "isquestion": false,
    //     "content": res
    // }
    // setChats([...chats, chat])
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

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
  });

  useEffect(() => {
    console.log("chatting");
  }, [chats, isloading]);

  return (
    <div className="bg-white p-3" style={{ height: "90vh" }}>
      <div style={{ height: "82vh", overflowY: "auto" }}>
        {chats.map((chat, index) => (
          <div key={index} className="chatbox">
            {chat.isquestion ? (
              <div className="chatq">
                <div className="box4 sb13">{chat.content}</div> :
                <SettingsAccessibilityRoundedIcon
                  color="primary"
                  fontSize="large"
                />
              </div>
            ) : (
              <div className="chata">
                <AdbRoundedIcon color="primary" fontSize="large" /> :
                <div className="box3 sb14">{chat.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex position-fixed message" style={{ width: "58%" }}>
        <TextField
          id="outlined-basic"
          label="Send a message."
          variant="outlined"
          sx={{ width: "80%", marginLeft: "30px" }}
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <ThemeProvider theme={theme}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}
