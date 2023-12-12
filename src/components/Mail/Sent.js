import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxMessages from "./InboxMessages";
import { mailAction } from "../../store/mailReducer";

function Sent() {
  const mails = useSelector((state) => state.mail.allSentMails);
  console.log(mails);

  const dispatch = useDispatch();
  dispatch(mailAction.sendRequest());
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
              str="send"
            />
          ))
        : " You Didn't Sent Any Message "}
    </div>
  );
}

export default Sent;
