import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchInboxmails } from "../../store/mailReducer";
import { Button, Col, Row } from "react-bootstrap";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// FontAwesomeIcon

function ReadMessage() {
  // useSelector
  let dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const request = useSelector((state) => state.mail.request);
  console.log(request);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(email);
  console.log(data);
  const paramas = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${email}/${request}/${paramas.messageId}.json`
      );
      let datas = await response.json();
      console.log(data);
      setData(datas);
      console.log(data);
      let updatedData = { ...datas, read: true };
      console.log(updatedData);
      if (request === "recieve") {
        try {
          const response2 = await fetch(
            `https://react-http-62209-default-rtdb.firebaseio.com/emails/${email}/${request}/${paramas.messageId}.json`,
            { method: "PUT", body: JSON.stringify(updatedData) }
          );
        } catch {
          alert("errrrrroroooor");
        }

        dispatch(fetchInboxmails(email, "recieve"));
      }
    };

    fetchData();
  }, []);

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${email}/${request}/${paramas.messageId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Mail Deleted Succesfully");
        if (request === "recieve") {
          dispatch(fetchInboxmails(email, "recieve"));
          navigate("/inbox", { replace: true });
        } else {
          dispatch(fetchInboxmails(email, "send"));
          navigate("/sent", { replace: true });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Row className="justify-content-between pt-4">
        <Col sm={2}>
          <Link to="/inbox">
            <Button variant="light">
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </Link>
        </Col>
        <Col sm={1}>
          <Button variant="light" onClick={deleteHandler}>
            {" "}
            <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
          </Button>{" "}
        </Col>
      </Row>
      {data !== null && Object.keys(data).length !== 0 ? (
        <>
          <div style={{ marginTop: "2rem" }}>
            {data !== null ? (
              <p style={{ fontWeight: "bold" }}> {data.subject} </p>
            ) : (
              ""
            )}
          </div>
          <Row className="justify-content-between">
            <Col sm={4}>From - {data.sender} </Col>
            <Col sm={2}>
              {months[data.time.month - 1]} {data.time.date}, {data.time.year}{" "}
              {data.time.hours}:{data.time.minutes}{" "}
            </Col>
          </Row>
          <Row>
            <Col>To - {data.reciever}</Col>{" "}
          </Row>
          <Row>
            <Col> {data.message}</Col>{" "}
          </Row>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReadMessage;
