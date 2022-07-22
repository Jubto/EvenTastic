import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
const CHAT_ENDPOINT = "http://localhost:9090";

const GroupChatPage = ({groupDetails, account}) => {
  const [userName] = useState(account.first_name);
  const [groupName] = useState(groupDetails.group_name);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket = io(CHAT_ENDPOINT);
    socket.emit("join", { userName, groupName }, (error) => {
      if (error) {
        console.log(error);
      }
    });    
    return () => {
      socket.disconnect()
    }
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("");
    } else alert("empty input");
  };

  return (
    <div>
      {messages.map((val, i) => {
        return (
          <div key={i}>
            <b>{val.user}:</b> {val.text}
          </div>
        );
      })}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default GroupChatPage