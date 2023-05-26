import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import "@fortawesome/free-solid-svg-icons";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export default function ButtonAppBar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar style={{ backgroundColor: "#1f151d" }}>
            <Diversity1Icon style={{ marginRight: "8px", color: "#691622" }} />
            <Typography
              variant="h6"
              component="div"
              style={{ color: "#691622" }}
              sx={{ flexGrow: 1 }}
            >
              Chat Doctor
            </Typography>
            {currentUser ? (
              <div>
                {/* <Button color="inherit">User Info</Button> */}
                <label className="fs-2 me-5">{currentUser.username}</label>
                <Button
                  onClick={navigate("/profile")}
                  style={{ color: "#b91d2a" }}
                >
                  User Info
                </Button>
                <Button onClick={logOut} style={{ color: "#b91d2a" }}>
                  SignOut
                </Button>
              </div>
            ) : (
              <div>
                {/* <Button onClick={()=>{navigate('/login')}} color="primary" sx={{borderRadius:"15px", background:"white"}}>Get Started</Button> */}
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  color="inherit"
                  style={{ color: "#b91d2a" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  color="inherit"
                  style={{ color: "#b91d2a" }}
                >
                  Signup
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
