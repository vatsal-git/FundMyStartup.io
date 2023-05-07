import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

import { userSelector } from "../../store/user";
import { useGetUserMessagesMutation } from "../../store/apis/message.api";
import { useGetUserByIdMutation } from "../../store/apis/user.api";
import ConversationSidebar from "../../components/molecules/conversationSidebar";
import ConversationWindow from "../../components/molecules/conversationWindow";
import { HandleResponse, NoData } from "../../components/commons/feedback";

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
    socketRef.current.on("deletedMessage", (message) => getUserMessages());
    return () => socketRef.current.disconnect();
  }, [getUserMessages]);

  //set default conversation
  useEffect(() => {
    if (getUserMessagesRes?.data?.conversations?.length > 0) {
      if (!chatWith) {
        navigate(
          "/messages/" + getUserMessagesRes?.data?.conversations[0]?.user?._id
        );
      } else {
        const conversation = getUserMessagesRes?.data?.conversations?.find(
          (conversation) => conversation?.user?._id === chatWith
        );
        if (conversation) {
          setCurrentConversation(conversation);
        } else {
          setCurrentConversation(newConversation(getUserByIdRes?.data?.user));
        }
      }
    } else if (chatWith) {
      setCurrentConversation(newConversation(getUserByIdRes?.data?.user));
    } else {
      setCurrentConversation(null);
    }
  }, [
    chatWith,
    getUserByIdRes?.data?.user,
    getUserMessagesRes?.data?.conversations,
    navigate,
  ]);

  //redirect to first conversation
  useEffect(() => {
    if (!chatWith && getUserMessagesRes?.data?.conversations?.length > 0) {
      const newConversationWith =
        getUserMessagesRes?.data?.conversations[0]?.user;
      const url = `/messages/${newConversationWith?._id}`;
      navigate(url);
    }
  }, [chatWith, getUserMessagesRes?.data?.conversations, navigate]);

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

  const handleDeleteMessage = (id) =>
    socketRef.current.emit("deleteMessage", id);

  return (
    <>
      <HandleResponse
        response={getUserMessagesRes}
        noDataMessage="No conversations found. Start a new one by exploring startups."
      />
      <HandleResponse response={getUserByIdRes} />
      <NoData
        show={!currentConversation}
        message="No conversations found. Start a new one by exploring startups."
        height="80vh"
      />
      {currentConversation && (
        <Box className="messages-container">
          <ConversationSidebar
            conversations={getUserMessagesRes?.data?.conversations}
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
    </>
  );
};

export default Messages;
