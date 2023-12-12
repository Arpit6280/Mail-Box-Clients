import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./InboxMessage.module.css";
import { Link } from "react-router-dom";

function InboxMessages(props) {
  let currentDate = new Date();
  let times = props.time;
  let dates;
  if (currentDate.getMinutes() - times.minutes === 0) dates = "now";
  else dates = `${times.hours}:${times.minutes}`;

  const readMessageHandler = () => {};

  return (
    <>
      <Link to={`/inbox/${props.id}`}>
        <Row onClick={readMessageHandler}>
          <Col sm={1} md={1}>
            {!props.read ? <span className={styles.read}></span> : ""}
          </Col>
          <Col sm={2} md={3}>
            {" "}
            {props.sender}{" "}
          </Col>
          <Col sm={7} md={6}>
            {props.subject}{" "}
          </Col>
          <Col sm={2} md={2}>
            {dates}{" "}
          </Col>
        </Row>
        <hr />
      </Link>
    </>
  );
}

export default InboxMessages;
