import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homescreen from "./screen/Homescreen";
import Maindashborad from "./screen/Maindashborad";
import LogIn from "./components/Login";
import Register from "./components/Register";
// import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from "react-redux";

function App() {
  // const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (["/login", "/register"].includes(location.pathname)) {
  //     dispatch(CLEAR_MESSAGE()); // clear message when changing location
  //   }
  // }, [dispatch, location]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/main" element={<Maindashborad />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Maindashborad />} />
      </Routes>
    </div>
  );
}

export default App;
