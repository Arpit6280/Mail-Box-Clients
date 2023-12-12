import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInboxmails } from "../../store/mailReducer";

function ReadMessage() {
  // useSelector
  let dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const [data, setData] = useState({});
  console.log(email);
  //   let data;
  console.log(data);
  const paramas = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-http-62209-default-rtdb.firebaseio.com/emails/${email}/recieve/${paramas.messageId}.json`
      );
      let datas = await response.json();
      console.log(data);
      setData(datas);
      let updatedData = { ...datas, read: true };
      console.log(updatedData);
      try {
        const response2 = await fetch(
          `https://react-http-62209-default-rtdb.firebaseio.com/emails/${email}/recieve/${paramas.messageId}.json`,
          { method: "PUT", body: JSON.stringify(updatedData) }
        );
      } catch {
        alert("errrrrroroooor");
      }

      dispatch(fetchInboxmails(email, "recieve"));
    };
    fetchData();
  }, []);

  return (
    <div>
      {data !== null ? (
        <p style={{ fontSize: "bold" }}> {data.subject} </p>
      ) : (
        ""
      )}
      {data !== null ? <p> {data.sender} </p> : ""}
      {data !== null ? <p> {data.message} </p> : ""}
    </div>
  );
}

export default ReadMessage;
