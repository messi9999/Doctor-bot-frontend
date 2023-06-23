import "./Header.css";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { Button, Nav } from "react-bootstrap";

export default function Header() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="header-main">
        <div className="header-sub-div">
          <div>
            <label>LOGO</label>
          </div>
          <div className="header-nav-btn">
            <div>
              <Nav variant="tabs" defaultActiveKey="/chat">
                <Nav.Item>
                  <Nav.Link href="/chat">CHAT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/pricing">PRICING</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/terms">TERMS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/policy">POLICY</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/contact">CONTACT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/twitter">TWITTER</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {currentUser ? (
              <div>
                <label className="fs-2 me-5">{currentUser.username}</label>
                <Button onClick={navigate("/profile")} color="inherit">
                  User Info
                </Button>
                <Button onClick={logOut} color="inherit">
                  SignOut
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-end align-items-end">
                <Button
                  className="header-login-btn border-0"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
