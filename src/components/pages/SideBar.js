import React from "react";
import styles from "./SideBar.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

function SideBar() {
  const unread = useSelector((state) => state.mail.unread);
  console.log(unread);
  return (
    <div className={styles.sidebar_container}>
      <Navbar
        className="bg-body-tertiary"
        style={{ padding: "0px", marginLeft: "1rem", marginTop: "8px" }}
      >
        <NavLink
          to="/compose"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <Container style={{ padding: "5px 1.5rem" }}>
            <Navbar.Brand> Compose </Navbar.Brand>
          </Container>
        </NavLink>
      </Navbar>
      <Navbar
        className="bg-body-tertiary"
        style={{ padding: "0px", marginLeft: "1rem", marginTop: "8px" }}
      >
        <NavLink
          to="/inbox"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <Container style={{ padding: "5px 1.5rem" }}>
            <Navbar.Brand> Inbox {unread} </Navbar.Brand>
          </Container>
        </NavLink>
      </Navbar>
      <Navbar
        className="bg-body-tertiary"
        style={{ padding: "0px", marginLeft: "1rem", marginTop: "8px" }}
      >
        <NavLink
          to="/sent"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <Container style={{ padding: "5px 1.5rem" }}>
            <Navbar.Brand> Sent </Navbar.Brand>
          </Container>
        </NavLink>
      </Navbar>
    </div>
  );
}

export default SideBar;
