import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

import { userSelector } from "../../store/user";
import { useGetUserMessagesMutation } from "../../store/apis/message.api";
import { useGetUserByIdMutation } from "../../store/apis/user.api";
import ConversationSidebar from "../../components/molecules/conversationSidebar";
import ConversationWindow from "../../components/molecules/conversationWindow";
import { HandleResponse, Loader } from "../../components/commons/feedback";

import "./index.css";
import { Box, Divider } from "@mui/material";

const newConversation = (user) => ({
  user,
  messages: [],
});

const Messages = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);
  const { chatWith } = useParams();
  const socketRef = useRef();

  const [currentConversation, setCurrentConversation] = useState(null);
  const [isDeleteMessageLoading, setIsDeleteMessageLoading] = useState(false);

  const [getUserMessages, getUserMessagesRes] = useGetUserMessagesMutation();
  const [getUserById, getUserByIdRes] = useGetUserByIdMutation();

  useEffect(() => {
    if (user) getUserMessages(user?._id);
  }, [getUserMessages, user]);

  useEffect(() => {
    if (chatWith) getUserById(chatWith);
  }, [chatWith, getUserById]);

  //socket connection
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4001");
    socketRef.current.on("createdMessage", (message) => getUserMessages());
    socketRef.current.on("deletedMessage", (message) => {
      getUserMessages();
      setIsDeleteMessageLoading(false);
    });
    return () => socketRef.current.disconnect();
  }, [getUserMessages]);

  //set default conversation
  useEffect(() => {
    if (getUserMessagesRes?.data?.length > 0) {
      if (!chatWith) {
        navigate("/messages/" + getUserMessagesRes?.data[0]?.user?._id);
      } else {
        const conversation = getUserMessagesRes?.data?.find(
          (conversation) => conversation?.user?._id === chatWith
        );
        if (conversation) {
          setCurrentConversation(conversation);
        } else {
          setCurrentConversation(newConversation(getUserByIdRes?.data));
        }
      }
    } else if (chatWith) {
      setCurrentConversation(newConversation(getUserByIdRes?.data));
    } else {
      setCurrentConversation(null);
    }
  }, [chatWith, getUserByIdRes?.data, getUserMessagesRes?.data, navigate]);

  //redirect to first conversation
  useEffect(() => {
    if (!chatWith && getUserMessagesRes?.data?.length > 0) {
      const newConversationWith = getUserMessagesRes?.data[0]?.user;
      const url = `/messages/${newConversationWith?._id}`;
      navigate(url);
    }
  }, [chatWith, getUserMessagesRes?.data, navigate]);

  const handleSend = (newMessage) => {
    if (
      newMessage.message.trim() !== "" &&
      newMessage.sender &&
      newMessage.receiver &&
      newMessage.message
    ) {
      socketRef.current.emit("message", newMessage);
    }
  };

  const handleDeleteMessage = (id) => {
    socketRef.current.emit("deleteMessage", id);
    setIsDeleteMessageLoading(true);
  };

  return (
    <Box className="messages-container-box">
      {!currentConversation && (
        <HandleResponse
          response={getUserMessagesRes}
          noDataMessage="No conversations found. Start by exploring startups."
          marginTop="4em"
        />
      )}
      <HandleResponse response={getUserByIdRes} marginTop="4em" backdrop />
      <Loader show={isDeleteMessageLoading} backdrop />
      {currentConversation && (
        <Box className="messages-container">
          <ConversationSidebar
            conversations={getUserMessagesRes?.data}
            currentConversation={currentConversation}
            setCurrentConversation={setCurrentConversation}
          />
          <Divider orientation="vertical" flexItem />
          <ConversationWindow
            conversation={currentConversation}
            handelSend={handleSend}
            handleDeleteMessage={handleDeleteMessage}
          />
        </Box>
      )}
    </Box>
  );
};

export default Messages;
