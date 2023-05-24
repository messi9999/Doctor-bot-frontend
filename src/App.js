import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Homescreen from './screen/Homescreen';
import Maindashborad from './screen/Maindashborad';
import LogIn from './components/Login';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import { CLEAR_MESSAGE } from './actions/types';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  // useEffect(() => {
  //   if (["/login", "/register"].includes(location.pathname)) {
  //     dispatch(CLEAR_MESSAGE()); // clear message when changing location
  //   }
  // }, [dispatch, location]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={< Homescreen />} />
        <Route path="/main" element={<Maindashborad />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
