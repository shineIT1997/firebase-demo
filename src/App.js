import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./App.css";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Card,
  CardContent,
} from "@material-ui/core";

import db from "./firebase";

import Message from "./Message";
function App() {
  console.log("1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    // all the logicto send
    event.preventDefault();

    db.collection("message")
      .add({
        username: username,
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Docs successfully written!");
      })
      .catch((err) => {
        console.log("Error writing document: ", err);
      });
    setInput("");
  };

  const handleType = (event) => setInput(event.target.value);

  useEffect(() => {
    console.log(2);
    // run once when app component loads
    db.collection("message").onSnapshot((snapshot) => {
      setMessages([
        ...snapshot.docs
          .map((doc) => doc.data())
          .sort((first, second) => {
            if (!first.timestamp || !second.timestamp) return;
            return second.timestamp.seconds - first.timestamp.seconds;
          }),
      ]);
    });
  }, []);

  useEffect(() => {
    console.log("setusername");
    setUsername(prompt("enter username"));
  }, []);

  console.log(messages);

  return (
    <div className="App">
      <h1>Hi Guys</h1>
      <form onSubmit={sendMessage}>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input type="text" value={input} onChange={handleType} />
          <Button
            disabled={!input}
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
            href="#contained-buttons"
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      {/* all messages here */}

      <Card className="messages-container" variant="outlined">
        <CardContent>
          {messages.map((message, index) => {
            return (
              <Message key={index} message={message} username={username} />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
