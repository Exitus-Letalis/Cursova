import React, { useState, useEffect, useRef } from "react";
import globalstyles from "../style/allstyle.module.scss";
import styles from "./chat.module.scss";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({ name: "", avatar: "" });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("ТВОЄ_API/GET");
      setMessages(response.data.messages);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Помилка отримання повідомлень:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { text: input, side: "right", userName: userData.name, userAvatar: userData.avatar };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      await axios.post("ТВОЄ_API/POST", newMessage);
    } catch (error) {
      console.error("Помилка надсилання повідомлення:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className={globalstyles.back}></div>
      <div className={styles.body}>
        <div className={styles.chatblock}>
          <div className={styles.mainlayers}>
            <div className={styles.topbar}>
              <img src={userData.avatar} alt="avatar" />
              <div className={styles.username} alt="nick">{userData.name}</div>
            </div>

            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${msg.side === "right" ? styles.right : styles.left}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form className={styles.inputblock} onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Повідомлення"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
