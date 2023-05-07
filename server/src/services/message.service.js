const Message = require("../models/message.model");

const createMessage = async (io, message) => {
  try {
    const newMessage = new Message(message);
    await newMessage.save();
    io.emit("createdMessage", newMessage);
  } catch (err) {
    io.emit("error", "Error Creating Message. Error: " + err);
  }
};

const deleteMessage = async (io, id) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    io.emit("deletedMessage", deletedMessage);
  } catch (err) {
    io.emit("error", "Error Deleting Message. Error: " + err);
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender")
      .populate("receiver")
      .exec();
    const conversations = {};
    messages.forEach((message) => {
      const otherUserId =
        message.sender._id.toString() === userId.toString()
          ? message.receiver._id
          : message.sender._id;
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user:
            otherUserId === message.sender._id
              ? message.sender
              : message.receiver,
          messages: [],
        };
      }
      conversations[otherUserId].messages.push({
        sender: message.sender,
        receiver: message.receiver,
        message: message.message,
        _id: message._id,
      });
    });
    res
      .status(200)
      .json({ success: true, conversations: Object.values(conversations) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

module.exports = {
  createMessage,
  getUserMessages,
  deleteMessage,
};
