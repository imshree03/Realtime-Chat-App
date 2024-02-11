const mongoose = require("mongoose");
const messageModel = require("../models/messagesModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added Successfully" });
    }
    return res.json({ msg: "Failed to add message to the db" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    // console.log(from, to);
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    // console.log(messages);

    const projectedMessages = messages.map(msg => {
      const data = {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
      return data;
    });

    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
