import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InboxMessages(props) {
  //   console.log(props.date.getMonths());
  let currentDate = new Date();
  let times = props.time;
  console.log(times);
  let dates;
  if (currentDate.getMinutes() - times.minutes === 0) dates = "now";
  else dates = `${times.hours}:${times.minutes}`;

  return (
    <>
      <Row>
        <Col sm={2} md={4}>
          {" "}
          {props.sender}{" "}
        </Col>
        <Col sm={8} md={6}>
          {props.subject}{" "}
        </Col>
        <Col sm={2} md={2}>
          {dates}{" "}
        </Col>
      </Row>
      <hr />
    </>
  );
}

export default InboxMessages;
