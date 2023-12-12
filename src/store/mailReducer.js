import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  sent: {},
  recieve: {},
  sender: "",
  reciever: "",
  allSentMails: [],
  allRecievedMails: [],
  request: "",
  unread: 0,
};
let iniEmail = localStorage.getItem("email");

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    sentMessage(state, action) {
      const newMail = action.payload;
      state.sent = newMail;
      state.sender = newMail.sender;
      state.reciever = newMail.reciever;
    },
    recieveMessage(state, action) {
      const newMail = action.payload;
      state.recieve = newMail;
    },
    allSentMails(state, action) {
      state.allSentMails = action.payload;
    },
    allRecievedMails(state, action) {
      state.allRecievedMails = action.payload;
    },
    unReadMessage(state, action) {
      state.unread = Number(state.unread) + 1;
    },
    readMessage(state, action) {
      if (state.unread > 0) state.unread = Number(state.unread) - 1;
    },
    sendRequest(state, action) {
      state.request = "send";
    },
    recieveRequest(state, action) {
      state.request = "recieve";
    },
    // },
  },
});

export const sendMailData = (mail, sender, reciever) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      let ind = sender.indexOf("@");
      sender = sender.slice(0, ind);
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${sender}/send.json`,
        {
          method: "POST",
          body: JSON.stringify(mail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending mail data failed");
      }
    };

    try {
      await sendRequest();
    } catch {
      alert("error in mailReducer");
    }
  };
};

export const recieveMailData = (mail, reciever) => {
  return async (dispatch) => {
    console.log("inside recieve mail");
    const sendRequest2 = async () => {
      let ind = reciever.indexOf("@");
      reciever = reciever.slice(0, ind);
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${reciever}/recieve.json`,
        {
          method: "POST",
          body: JSON.stringify(mail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending mail data failed");
      }
    };
    try {
      await sendRequest2();
    } catch {
      alert("error in mailReducer");
    }
  };
};

export const fetchInboxmails = (sender, str) => {
  return async (dispatch) => {
    const fetchMails = async () => {
      console.log(sender);
      let ind = sender.indexOf("@");
      if (ind !== -1) {
        sender = sender.slice(0, ind);
      }
      console.log(ind);

      console.log(sender);
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${sender}/${str}.json`
      );
      if (!response.ok) {
        throw new Error("Could not fetch Data ");
      }
      const data = await response.json();
      console.log(data);
      let mails = [];
      if (data !== null) {
        let ar = Object.keys(data);
        for (const key in data) {
          // for unread message start
          if (str === "recieve") {
            if (data[key].read === false) {
              dispatch(mailAction.unReadMessage());
            } else {
              dispatch(mailAction.readMessage());
            }
          }

          // end

          let mail = {
            id: key,
            sender: data[key].sender,
            message: data[key].message,
            reciever: data[key].reciever,
            subject: data[key].subject,
            read: data[key].read,
            time: data[key].time,
          };
          mails.push(mail);
        }
        console.log(ar);
      }

      return mails;
    };
    try {
      const mailData = await fetchMails();
      console.log(mailData);
      if (str === "send") dispatch(mailAction.allSentMails(mailData));
      else dispatch(mailAction.allRecievedMails(mailData));
    } catch (e) {
      console.log(e);
      alert("Errrrror");
    }
  };
};

export const mailAction = mailSlice.actions;
export default mailSlice.reducer;
