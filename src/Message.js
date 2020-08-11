import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";

import "./Message.css";

function Message({ message, username }) {
  const isUser = message.username === username;
  return (
    <div className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCart" : "message__guestCart"}>
        <CardContent>
          <Typography color="initial" component="h2" variant="h6">
            {message.username} : {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Message;
