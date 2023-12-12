import React from "react";
import { useSelector } from "react-redux";
import InboxMessages from "./InboxMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faInbox, faPen } from "@fortawesome/free-solid-svg-icons";

function Inbox() {
  const mails = useSelector((state) => state.mail.allRecievedMails);
  console.log(mails);
  return (
    <div style={{ margin: "2.5rem" }}>
      {mails.length > 0
        ? mails.map((item) => (
            <InboxMessages
              key={item.id}
              id={item.id}
              sender={item.reciever}
              subject={item.subject}
              read={item.read}
              time={item.time}
            />
          ))
        : "Inbox is Empty "}
    </div>
  );
}

export default Inbox;
