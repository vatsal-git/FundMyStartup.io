const Message = require("../models/message.model");

const createMessage = async (io, message) => {
  try {
    const newMessage = new Message(message);

    await newMessage.save();

    io.emit("createdMessage", newMessage);
  } catch (error) {
    io.emit("error", error.message);
  }
};

const deleteMessage = async (io, id) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);

    io.emit("deletedMessage", deletedMessage);
  } catch (err) {
    io.emit("error", error.message);
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
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

    res.status(200).json(Object.values(conversations));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  getUserMessages,
  deleteMessage,
};
