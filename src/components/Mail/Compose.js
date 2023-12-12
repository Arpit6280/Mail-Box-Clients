import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import styles from "./Compose.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/mailReducer";
import { Button } from "react-bootstrap";

function Compose() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const senderEmail = useSelector((state) => state.auth.email);
  const [recieverEmail, setRecieverEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();

  const recieverHandler = (e) => {
    setRecieverEmail(e.target.value);
  };

  const subjectHandler = (e) => {
    setSubject(e.target.value);
  };

  const messageHandler = (e) => {
    setMessage(editorState.getCurrentContent().getPlainText());
  };

  const sendEmailHandler = async () => {
    let sendersEmail = senderEmail + "@gmail.com";
    console.log(sendersEmail);
    let currentDate = new Date();
    let sendmail = {
      reciever: recieverEmail,
      sender: sendersEmail,
      subject: subject,
      message: message,
      read: false,
      time: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
      },
    };
    setRecieverEmail("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
    // setMessage("");
    // let ind = recieverEmail.indexOf("@");
    // let reciever = recieverEmail.slice(0, ind);
    dispatch(mailAction.recieveMessage(sendmail));
    dispatch(mailAction.sentMessage(sendmail));
  };

  return (
    <div className={styles.compose_container}>
      <Row className={`${styles.input} flex-col`}>
        <Col md={6}>
          <input
            type="text"
            placeholder="Enter Reciepent Email"
            onChange={recieverHandler}
            value={recieverEmail}
          />
        </Col>
        <Col md={6}>
          <input
            type="text"
            placeholder="Enter Subject"
            onChange={subjectHandler}
            value={subject}
          />
        </Col>
      </Row>
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={styles["wrapper-class"]}
        editorClassName={styles["editor-class"]}
        toolbarClassName={styles["toolbar-class"]}
        placeholder="Enter Your Message ...."
        onChange={messageHandler}
      />
      <Button
        variant="info"
        className="text-light"
        style={{ margin: "1rem 47%" }}
        onClick={sendEmailHandler}
      >
        Send{" "}
      </Button>
    </div>
  );
}

export default Compose;
