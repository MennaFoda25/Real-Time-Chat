const express = require('express');
const { createChat, getUserChats, getChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/',createChat)
router.get('/:userId', getUserChats);
router.get('/:firstId/:secId', getChat);

module.exports = router;