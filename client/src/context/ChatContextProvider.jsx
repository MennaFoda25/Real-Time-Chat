import { useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import { ChatContext } from './ChatContext';
import { io } from 'socket.io-client';

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesloading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  console.log('online', onlineUser);

  //add online users
  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);
      const userId = user?.data?._id || user?._id;
      if (userId) {
        newSocket.emit('addNewUser', userId);
      }
      newSocket.on('getOnlineUsers', (res) => {
        setOnlineUser(res);
      });
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    if (socket === null) return;

    socket.on('getMessage', (res) => {
      if (currentChat?._id !== res.chatId) {
        console.log('Not my chat');
        return;
      }
      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off('getMessage');
    };
  }, [socket, currentChat, messages]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log('Error fetching users:', response);
      }
      const usersArray = response.data;
      if (!Array.isArray(usersArray)) {
        console.error('Expected an array of users but got:', usersArray);
        return;
      }
      const currentUserId = user?.data?._id || user?._id;
      if (!currentUserId) {
        console.log(
          'ChatContextProvider: currentUserId is not available for potential chats calculation.'
        );
        return;
      }
      const pChats = usersArray.filter((u) => {
        if (currentUserId === u._id) return false;
        let isChatCreated = false;
        if (userChats && Array.isArray(userChats)) {
          isChatCreated = userChats.some((chat) => {
            const chatMembers = chat?.members;
            if (!chatMembers || chatMembers.length < 2) {
              return false;
            }
            // Now safely check if the potential user is in the chat members
            return chatMembers.some((member) => member?._id === u._id);
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
    };
    if (user) {
      getUsers();
    }
  }, [userChats, user]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId) => {
      if (isSendingMessage) return; // Prevent multiple clicks
      setIsSendingMessage(true); // Start loading
      if (!textMessage) {
        console.log('You must type something to send.');
        setIsSendingMessage(false); // Stop loading
        return;
      }
      console.log('sendTextMessage: Sending message payload:', {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });
      const response = await postRequest(`${baseUrl}/messages`, {
        chatId: currentChatId,
        senderId: sender._id,
        text: textMessage,
      });
      if (response.error) {
        setSendTextMessageError(response.error);
        console.error('sendTextMessage: Error response from backend:', response.error);
        setIsSendingMessage(false); // Stop loading on error
        return;
      }

      const recipientId = currentChat?.members.find((member) => member?._id !== sender?._id);
      socket.emit('sendMessage', {
        ...response.data,
        recipientId: recipientId?._id, // FIX: Pass the recipient's ID, not the entire object
      });
      setSendTextMessageError(null);
      setNewMessage(response.data);
      console.log('sendTextMessage: Backend response (new message object):', response);
      setMessages((prevMessages) => {
        const currentMessages = prevMessages || [];
        const updatedMessages = [...currentMessages, response.data];
        return updatedMessages;
      });
      setIsSendingMessage(false);
    },
    [messages, socket, currentChat, isSendingMessage]
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
    setMessages(null);
    setMessagesError(null);
    console.log('Context: updateCurrentChat called, new currentChat:', chat);
  }, []);

  // Correct and uncommented createChat function
  const createChat = useCallback(
    async (firstId, secondId) => {
      if (isCreatingChat) return;
      setIsCreatingChat(true);
      const currentUserId = user?.data?._id || user?._id;

      // Check if the IDs are valid before proceeding
      if (!currentUserId || !secondId) {
        setIsCreatingChat(false);
        console.error('Missing user ID or recipient ID');
        return;
      }

      // Your existing code for createChat
      const existingChat = userChats?.find((chat) => {
        if (!chat || !chat.members || chat.members.length < 2) {
          return false;
        }
        return (
          (chat.members[0]?._id === firstId && chat.members[1]?._id === secondId) ||
          (chat.members[0]?._id === secondId && chat.members[1]?._id === firstId)
        );
      });

      if (existingChat) {
        console.log('Chat already exists:', existingChat);
        updateCurrentChat(existingChat);
        setIsCreatingChat(false);
        return;
      }
      const response = await postRequest(`${baseUrl}/chats`, {
        firstId: currentUserId,
        secondId,
      });

      if (response.error) {
        console.log('Error creating chat:', response);
        setIsCreatingChat(false);
        return;
      }

      setUserChats((prev) => (prev ? [...prev, response] : [response]));
      updateCurrentChat(response);
      console.log('New chat created:', response);

      setPotentialChats((prevPotentialChats) => {
        return prevPotentialChats.filter((u) => u._id !== secondId);
      });
      setIsCreatingChat(false);
    },
    [userChats, updateCurrentChat, user, isCreatingChat]
  );

  useEffect(() => {
    const getUserChats = async () => {
      const userId = user?.data?._id || user?._id;
      if (!userId) return;
      setIsUserChatsLoading(true);
      setUserChatsError(null);
      const response = await getRequest(`${baseUrl}/chats/${userId}`);
      setIsUserChatsLoading(false);
      if (response.error) {
        return setUserChatsError(response);
      }
      setUserChats(response);
    };
    if (user) {
      getUserChats();
    }
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat?._id) {
        setMessages(null);
        return;
      }
      setIsMessagesloading(true);
      setMessagesError(null);
      console.log('Fetching messages for currentChat ID:', currentChat._id);
      const response = await getRequest(`${baseUrl}/messages/${currentChat._id}`);
      setIsMessagesloading(false);
      if (response.error) {
        console.error('Error fetching messages:', response);
        return setMessagesError(response);
      }
      setMessages(response.messages);
      console.log('Messages fetched for ID', currentChat._id, ':', response.messages);
    };
    getMessages();
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        sendTextMessageError,
        isCreatingChat,
        isSendingMessage,
        onlineUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
