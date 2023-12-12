import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-reducer";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // useDispatch
  const dispatch = useDispatch();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_o7vD1dv2xerksf4mLLdbKjlKU8zRKQw",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setEmail("");
        setPassword("");
        let data = await response.json();
        console.log(data);
        let idToken = data.idToken;
        let email = data.email;
        dispatch(authActions.login({ idToken, email }));
        navigate("/inbox", { replace: true });
      } else {
        response.json().then((data) => {
          //show an error modal
          alert(data.error.message);
        });
      }
    } catch (e) {
      console.log(e);
      alert("Error while Login", e);
    }
  };
  return (
    <Container>
      <Row className="pt-5">
        <Col sm={6}>
          <img
            className={styles.img}
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt=""
          />
        </Col>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={emailHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={passwordHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br />
            <Link to="/forgetPassword">Forget Password</Link>
          </Form>
          <br />
          <p>
            Doesn't have an account? <Link to="/signup">Register here </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
