import * as React from "react";
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
      <div>
        <div>
          <div
            style={{
              position: "absolute",
              height: "98.83px",
              left: "0px",
              right: "0px",
              top: "0px",
              background: "#FFFFFF",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.13)",
            }}
          >
            <Diversity1Icon
              style={{
                position: "absolute",
                width: "103px",
                height: "56.49px",
                left: "80px",
                top: "24px",
                color: "#51BBD5",
              }}
            />
            {currentUser ? (
              <div
                style={{
                  width: "300px",
                  position: "absolute",
                  right: "50px",
                  top: "41.25px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* <label className="fs-2 me-5">{currentUser.username}</label>
                {console.log(currentUser)} */}
                {currentUser.roles[0] === "ROLE_ADMIN" && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                    }}
                    style={{
                      family: "Lato",
                      style: "normal",
                      weight: "600",
                      color: "#51BBD5",
                      border: "none",
                      background: "white",
                    }}
                  >
                    ADMIN
                  </button>
                )}
                <button
                  onClick={() => {
                    navigate("/profile");
                  }}
                  style={{
                    family: "Lato",
                    style: "normal",
                    weight: "600",
                    color: "#51BBD5",
                    border: "none",
                    background: "white",
                  }}
                >
                  User Info
                </button>
                <button
                  onClick={logOut}
                  style={{
                    family: "Lato",
                    style: "normal",
                    weight: "600",
                    color: "#51BBD5",
                    border: "none",
                    background: "white",
                  }}
                >
                  SignOut
                </button>
              </div>
            ) : (
              <div
                style={{
                  width: "150px",
                  position: "absolute",
                  right: "50px",
                  top: "41.25px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* <Button onClick={()=>{navigate('/login')}} color="primary" sx={{borderRadius:"15px", background:"white"}}>Get Started</Button> */}
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  style={{
                    family: "Lato",
                    style: "normal",
                    weight: "600",
                    color: "#51BBD5",
                    border: "none",
                    background: "white",
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  style={{
                    family: "Lato",
                    style: "normal",
                    weight: "600",
                    color: "#51BBD5",
                    border: "none",
                    background: "white",
                  }}
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
