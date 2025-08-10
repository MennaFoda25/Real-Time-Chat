const Chat = require('../models/chatModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

//Cretae chat

exports.createChat = asyncHandler(async (req, res, next) => {
  const { firstId, secondId } = req.body;

  if (!firstId || !secondId) {
    return next(new ApiError('Both firstId and secondId are required to create a chat.', 400));
  }
  let chat = await Chat.findOne({
    members: { $all: [firstId, secondId] },
  });

  if (!chat) {
    chat = await Chat.create({
      members: [firstId, secondId],
    });
  }

  return res.status(200).json(chat);
});
//get user Chat

exports.getUserChats = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find({
    members: { $in: [req.params.userId] },
  });

  if (!chats) {
    return next(new ApiError(`No chats for this id : ${req.params.userId}`, 404));
  }
  res.status(200).json(chats);
});
//get specific Chat

exports.getChat = asyncHandler(async (req, res, next) => {
  const { firstId, secondId } = req.params;

  const chats = await Chat.findOne({
    members: { $all: [firstId, secondId] },
  });

  if (!chats) {
    return next(new ApiError('No chats found for this user', 404));
  }

  return res.status(200).json(chats);
});
