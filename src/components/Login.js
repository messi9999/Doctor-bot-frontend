import "./Login.css";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import { login } from "../actions/auth";
import { isEmail } from "validator";
import { ReactComponent as MainLogo } from "../assets/logos/LOGO.svg";
import { ReactComponent as GoogleLogo } from "../assets/logos/GoogleVector.svg";
import { ReactComponent as LineLogo } from "../assets/logos/LineLogo.svg";
import { Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/main");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/main" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <MainLogo className="profile-img-card" />
        <div className="login-switch-btn">
          <a href="/login" className="switch-login">
            LOGIN
          </a>
          <a href="/register" className="switch-register">
            CREATE ACCOUNT
          </a>
        </div>

        <div className="google-login">
          <div>
            <GoogleLogo className="goolge-logo" />
            <label>LOGIN WITH GOOGLE</label>
          </div>
        </div>

        <div className="line-logo">
          <LineLogo />
        </div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 }
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ margin: "0px" }}>
            <TextField
              label="Email"
              color="grey"
              focused
              fullWidth
              type="email"
              placeholder="Enter your email"
              sx={{ marginTop: "48px", color: "#ADADAD;" }}
              onChange={onChangeUsername}
            />
          </div>
          <div style={{ margin: "0px" }}>
            <TextField
              label="Password"
              color="grey"
              focused
              fullWidth
              type="password"
              placeholder="Enter your password"
              sx={{ marginTop: "31px", color: "#ADADAD;" }}
              onChange={onChangePassword}
            />
          </div>
        </Box>
        <Button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading || !isEmail(username) || password === ""}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

export default Login;
