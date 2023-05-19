import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import MessagePill from "../../atoms/messagePill";
import { NoData } from "../../commons/feedback";
import { userSelector } from "../../../store/user";

import "./index.css";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SexyAvatar from "../../commons/sexyAvatar";
import { useNavigate } from "react-router-dom";

const ConversationWindow = ({
  conversation,
  handelSend,
  handleDeleteMessage,
}) => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);

  const [message, setMessage] = React.useState("");
  const [showDelete, setShowDelete] = React.useState(null);

  return (
    <Box className="conversationWindow-container">
      <Box className="conversationWindow-container-titleBar">
        <SexyAvatar
          name={conversation?.user?.name}
          avatar={conversation?.user?.avatar}
          height={40}
          width={40}
        />
        <Typography variant="h5">{conversation?.user?.name}</Typography>
        <IconButton
          onClick={() => navigate("/profile/" + conversation.user._id)}
        >
          <InfoOutlinedIcon />
        </IconButton>
      </Box>
      <Box className="conversationWindow-container-messages">
        <NoData
          show={!conversation?.messages || !conversation?.messages?.length}
          message="Start a conversation 🗣️"
        />
        <Box className="conversationWindow-container-messages-container">
          {conversation?.messages
            ?.slice()
            .reverse()
            .map((message, i) => {
              const isSender = message.sender._id === user._id;
              const willShowDelete = isSender && showDelete === message._id;
              return (
                <MessagePill
                  key={i}
                  message={message.message}
                  onMouseEnter={() => setShowDelete(message._id)}
                  onMouseLeave={() => setShowDelete(null)}
                  handleDelete={() => handleDeleteMessage(message._id)}
                  isSender={isSender}
                  willShowDelete={willShowDelete}
                />
              );
            })}
        </Box>
      </Box>
      <Divider />
      <Box className="conversationWindow-input">
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setMessage("");
              handelSend({
                sender: user._id,
                receiver: conversation.user._id,
                message,
              });
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendOutlinedIcon />}
          onClick={() => {
            setMessage("");
            handelSend({
              sender: user._id,
              receiver: conversation.user._id,
              message,
            });
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationWindow;
