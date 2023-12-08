import { Fragment } from "react";
import SignUp from "./components/pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Welcome from "./components/Welcome";
import { useSelector } from "react-redux";
import Compose from "./components/Mail/Compose";
import "./App.css";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Fragment>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Welcome />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/compose" element={<Compose />} />
      </Routes>
    </Fragment>
  );
}

export default App;
