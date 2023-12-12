import { Fragment, useEffect } from "react";
import SignUp from "./components/pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Welcome from "./components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import Compose from "./components/Mail/Compose";
import "./App.css";
import {
  fetchInboxmails,
  mailAction,
  recieveMailData,
  sendMailData,
} from "./store/mailReducer";
import SideBar from "./components/pages/SideBar";
import Inbox from "./components/Mail/Inbox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sent from "./components/Mail/Sent";
import ReadMessage from "./components/Mail/ReadMessage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const smail = useSelector((state) => state.mail.sent);
  const rmail = useSelector((state) => state.mail.recieve);
  const sender = useSelector((state) => state.mail.sender);
  const reciever = useSelector((state) => state.mail.reciever);
  const email = useSelector((state) => state.auth.email);
  let dispatch = useDispatch();
  console.log(email);

  useEffect(() => {
    let intervalId = setInterval(() => {
      // dispatch(mailAction.setUnreadMessageToZero());
      dispatch(fetchInboxmails(email, "send"));
      dispatch(fetchInboxmails(email, "recieve"));
    }, [2000]);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, email]);
  useEffect(() => {
    dispatch(sendMailData(smail, sender, reciever));

    dispatch(recieveMailData(rmail, reciever));
  }, [smail, dispatch, rmail]);

  console.log(isLoggedIn);
  return (
    <Fragment>
      {isLoggedIn ? (
        <>
          <Row>
            <Col
              style={{ backgroundColor: " rgb(243 244 246)", height: "6rem" }}
            >
              <Welcome />
            </Col>
          </Row>
          <Row>
            <Col md={2} style={{ paddingTop: "1.3rem" }}>
              {isLoggedIn ? <SideBar /> : ""}
            </Col>
            <Col
              md={10}
              className="main_container"
              style={{ width: "80%", height: "75vh" }}
            >
              <Routes>
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/compose" element={<Compose />} />
                <Route path="/sent" element={<Sent />} />
                <Route path="/inbox/:messageId" element={<ReadMessage />} />
              </Routes>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
      <Routes>
        {/* {isLoggedIn ? (
          <Route path="/" element={<Welcome />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
        )} */}
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Fragment>
  );
}

export default App;
