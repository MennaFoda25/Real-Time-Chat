const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

chatSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'members',
    select: 'name email',
  });
  next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;