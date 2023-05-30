import React from "react";
import { useNavigate } from "react-router-dom";

import MessagesSidebarElement from "../../atoms/messagesSidebarElement";

import "./index.css";
import { Box, Divider } from "@mui/material";

const ConversationSidebar = ({
  conversations,
  currentConversation,
  setCurrentConversation,
}) => {
  const navigate = useNavigate();

  const onElementClick = (conversation) => {
    setCurrentConversation(conversation);
    navigate(`/messages/${conversation.user._id}`);
  };

  return (
    <Box className="conversationSidebar-container">
      {conversations?.map((conversation) => {
        return (
          <React.Fragment key={conversation?.user?._id}>
            <MessagesSidebarElement
              avatar={conversation.user.avatar}
              title={conversation.user.name}
              isActive={
                currentConversation?.user?._id === conversation?.user?._id
              }
              onElementClick={() => onElementClick(conversation)}
              latestMessage={conversation?.messages[0]?.message}
            />
            <Divider />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default ConversationSidebar;
