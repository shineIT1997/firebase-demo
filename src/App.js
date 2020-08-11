import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

import Message from "./Message";
function App() {
  console.log("1");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "kata",
      text: "hi guy",
    },
    {
      name: "xoss",
      text: 'What"s up',
    },
  ]);
  const [username, setUsername] = useState("");

  const sendMessage = (event) => {
    // all the logicto send
    event.preventDefault();
    setMessages([...messages, { name: username, text: input }]);
    setInput("");
  };

  useEffect(() => {
    console.log("setusername");
    setUsername(prompt("enter username"));
  }, []);

  // useEffect(() => {
  //   console.log("2");
  //   // effect
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [input]);

  console.log(input);
  console.log(messages);

  return (
    <div className="App">
      <h1>Hi Guys</h1>
      <form onSubmit={sendMessage}>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
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

      {messages.map((message, index) => {
        return <Message key={index} message={message} username={username} />;
      })}
    </div>
  );
}

export default App;
