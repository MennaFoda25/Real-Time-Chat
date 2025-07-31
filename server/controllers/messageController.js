const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');

//Create Message
exports.createMessage = asyncHandler(async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = await Message.create({
    chatId,
    senderId,
    text,
  });

  res.status(201).json({
    status: 'success',
    data: message,
  });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const messages = await Message.find({ chatId });

  if (!messages) {
    return next(new ApiError('No messages found for this chat', 404));
  }
  res.status(200).json({results:messages.length, messages });
});
