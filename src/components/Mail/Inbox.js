import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxMessages from "./InboxMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faInbox, faPen } from "@fortawesome/free-solid-svg-icons";
import { mailAction } from "../../store/mailReducer";

function Inbox() {
  const mails = useSelector((state) => state.mail.allRecievedMails);
  const dispatch = useDispatch();
  dispatch(mailAction.recieveRequest());
  console.log(mails);
  return (
    <div style={{ margin: "2.5rem" }}>
      {mails.length > 0
        ? mails.map((item) => (
            <InboxMessages
              key={item.id}
              id={item.id}
              sender={item.sender}
              subject={item.subject}
              read={item.read}
              time={item.time}
              str="recieve"
            />
          ))
        : "Inbox is Empty "}
    </div>
  );
}

export default Inbox;
