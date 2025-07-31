const mongoose = require('mongoose');

const messageScheema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

// messageScheema.pre(/^find/, function (next) {
//   this.populate({
//     path: "chatId",
//     select: "name -_id",
//   });
//   next();
// });

const Message = mongoose.model("Message",messageScheema)

module.exports = Message;