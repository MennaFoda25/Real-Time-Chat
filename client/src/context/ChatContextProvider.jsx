// import { useState, useEffect, useCallback } from 'react';
// import { baseUrl, getRequest, postRequest } from '../utils/services';
// import { ChatContext } from './ChatContext';

// export const ChatContextProvider = ({ children, user }) => {
//   const [userChats, setUserChats] = useState(null);
//   const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
//   const [userChatsError, setUserChatsError] = useState(null);
//   const [potentialChats, setPotentialChats] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState(null);
//   const [isMessagesLoading, setIsMessagesloading] = useState(false);
//   const [messageError, setMessagesError] = useState(null);

//   // console.log('current chat ', currentChat);
//   console.log('messages', messages);

//   useEffect(() => {
//     const getUsers = async () => {
//       const response = await getRequest(`${baseUrl}/users`);

//       //console.log('DEBUG: Full response from /users API:', response);

//       if (response.error) {
//         return console.log('Error fetching users:', response);
//       }

//       const usersArray = response.data;

//       if (!Array.isArray(usersArray)) {
//         // Check if it's an array before filtering
//         console.error('Expected an array of users but got:', usersArray);
//         // Set an error state or handle this unexpected format
//         return;
//       }

//       const currentUserId = user?.data?._id || user?._id; // Get current user ID

//       // If currentUserId is not available yet, return early
//       if (!currentUserId) {
//         console.log(
//           'ChatContextProvider: currentUserId is not available for potential chats calculation.'
//         );
//         return;
//       }

//       const pChats = usersArray.filter((u) => {
//         if (currentUserId === u._id) {
//           return false;
//         }

//         let isChatCreated = false;
//         // if (userChats._id === u._id) return false;

//         if (userChats) {
//           isChatCreated = userChats.some((chat) => {
//             return (
//               chat && chat.members && chat.members.some((member) => member && member._id === u._id)
//             );
//           });
//         }
//         return !isChatCreated;
//       });
//       setPotentialChats(pChats);
//       console.log('✅ setPotentialChats →', pChats);
//     };
//     getUsers();
//   }, [userChats, user]);

//   const updateCurrentChat = useCallback((chat) => {
//     setCurrentChat(chat);
//     setMessages(null); // Clear messages when a new chat is selected
//     setMessagesError(null); // Clear errors for new chat
//   }, []);

//   //  useEffect(() => {
//   //   const getUsers = async () => {
//   //      const response = await getRequest(`${baseUrl}/users`);

//   // //     console.log('📦 Users API response:', response);

//   //      if (response.error) {
//   //        return console.log('Error fetching users:', response);
//   //      }

//   //      const usersArray = response.data; // ✅ extract array

//   //      if (!Array.isArray(usersArray)) {
//   //        console.error('Expected an array of users but got:', usersArray);
//   //        return;
//   //     }

//   //      const currentUserId = user?.data?._id || user?._id;

//   //     const pChats = usersArray.filter((u) => {
//   //       if (currentUserId === u._id) return false;

//   //       let isChatCreated = false;

//   //       if (userChats) {
//   //         isChatCreated = userChats.some((chat) => chat.members.includes(u._id));
//   //       }
//   //       return !isChatCreated;
//   //     });
//   //     setPotentialChats(pChats);
//   //     console.log('✅ setPotentialChats →', pChats);
//   //    };

//   //    getUsers();
//   //  }, [userChats, user]);

//   const createChat = useCallback(
//     async (firstId, secondId) => {
//       //   async (firstId, secondId) => {
//       //     console.log('Creating chat with:', { firstId, secondId }); // 🔍
//       //     // Prevent duplicate chat
//       //     const existingChat = userChats.find(
//       //       (chat) => chat.members.includes(firstId) && chat.members.includes(secondId)
//       //     );

//       //     if (existingChat) return;

//       const response = await postRequest(`${baseUrl}/chats`, {
//         firstId,
//         secondId,
//       });

//       if (response.error) {
//         console.log('Error creating chat:', response);
//         return;
//       }
//       setUserChats((prev) => [...prev, response]);
//     },
//     [userChats]
//   );

//   useEffect(() => {
//     const getUserChats = async () => {
//       const userId = user?.data?._id || user?._id;

//       if (!userId) return;

//       setIsUserChatsLoading(true);
//       setUserChatsError(null);

//       const response = await getRequest(`${baseUrl}/chats/${userId}`);

//       setIsUserChatsLoading(false);
//       //  console.log('User chat response:', response); // ✅ inspect this

//       if (response.error) {
//         return setUserChatsError(response);
//       }

//       setUserChats(response);
//     };

//     getUserChats();
//   }, [user]);

//   useEffect(() => {
//     const getMessages = async () => {
//       setIsMessagesloading(true);
//       setMessagesError(null);
//       console.log('Fetching messages for currentChat ID:', currentChat?._id);
//       const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

//       setIsMessagesloading(false);
//       //  console.log('User chat response:', response); // ✅ inspect this

//       if (response.error) {
//         return setMessagesError(response);
//       }

//       setMessages(response.messages);
//     };

//     getMessages();
//   }, [currentChat]);

//   return (
//     <ChatContext.Provider
//       value={{
//         userChats,
//         isUserChatsLoading,
//         userChatsError,
//         potentialChats,
//         createChat,
//         updateCurrentChat,
//         messages,
//         isMessagesLoading,
//         messageError,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

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
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);

  console.log('online', onlineUser);
  useEffect(() => {
    // Only connect if a user is logged in
    if (user) {
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      // Emit the event with the user's ID
      // The user object might be nested, so we'll use a robust check
      const userId = user?.data?._id || user?._id;
      if (userId) {
        newSocket.emit('addNewUser', userId);
      }
      newSocket.on('getOnlineUsers', (res) => {
        setOnlineUser(res);
      });

      // Clean up the socket connection on component unmount or user change
      return () => {
        newSocket.off('getOnlineUsers');
        newSocket.disconnect();
      };
    }
  }, [user]); // This useEffect runs only when the 'user' object from context changes

  // getUsers for PotentialChats
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
        if (userChats) {
          isChatCreated = userChats.some((chat) => {
            return (
              chat && chat.members && chat.members.some((member) => member && member._id === u._id)
            );
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
      if (!textMessage) {
        console.log('You must type something to send.');
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
        return;
      }

      setSendTextMessageError(null);
      setNewMessage(response.data);

      // CRITICAL DEBUGGING LOGS FOR MESSAGES STATE UPDATE
      console.log('sendTextMessage: Backend response (new message object):', response);

      setMessages((prevMessages) => {
        const currentMessages = prevMessages || [];
        const updatedMessages = [...currentMessages, response.data];
        // console.log(
        //   'sendTextMessage: Messages state before update (inside callback):',
        //   prevMessages
        // );
        // console.log(
        //   'sendTextMessage: Messages state AFTER update (inside callback):',
        //   updatedMessages
        // );
        return updatedMessages;
      });
    },
    [setMessages, setSendTextMessageError, setNewMessage]
  );

  // const sendTextMessage = useCallback(
  //   async (textMessage, sender, currentChatId) => {
  //     if (!textMessage) {
  //       console.log('You must type something to send.');
  //       return; // Prevent sending empty messages
  //     }
  //     const response = await postRequest(`${baseUrl}/messages`, {
  //       chatId: currentChatId,
  //       senderId: sender._id,
  //       text: textMessage,
  //     });
  //     if (response.error) {
  //       return setSendTextMessageError(response.error);
  //     }

  //     // Clear any previous send error on success
  //     setSendTextMessageError(null);

  //     setNewMessage(response);

  //     setMessages((prevMessages) => {
  //       // Ensure prevMessages is an array. If it's null, initialize with empty array.
  //       return prevMessages ? [...prevMessages, response] : [response];
  //     });
  //     //  setTextMessage('');
  //   },
  //   [setMessages, setSendTextMessageError, setNewMessage]
  // );

  // updateCurrentChat function (used by Chat.jsx onClick)
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
    setMessages(null); // Clear messages when a new chat is selected
    setMessagesError(null); // Clear errors
    console.log('Context: updateCurrentChat called, new currentChat:', chat);
  }, []);

  // createChat function (used by PotentialChats)
  const createChat = useCallback(
    async (firstId, secondId) => {
      const existingChat = userChats?.find(
        (chat) =>
          (chat.members[0] === firstId && chat.members[1] === secondId) ||
          (chat.members[0] === secondId && chat.members[1] === firstId)
      );
      if (existingChat) {
        console.log('Chat already exists:', existingChat);
        updateCurrentChat(existingChat);
        return;
      }
      const response = await postRequest(`${baseUrl}/chats`, {
        firstId,
        secondId,
      });
      if (response.error) {
        console.log('Error creating chat:', response);
        return;
      }
      setUserChats((prev) => (prev ? [...prev, response] : [response]));
      updateCurrentChat(response); // Select the new chat
      console.log('New chat created:', response);
    },
    [userChats, updateCurrentChat]
  );

  // getUserChats (fetches user's existing chats)
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

  // getMessages (fetches messages for the current selected chat)
  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat?._id) {
        // Only fetch if a chat is selected
        setMessages(null); // Ensure messages are null if no chat is selected
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
      setMessages(response.messages); // FIX: Set messages to the array within the response
      console.log('Messages fetched for ID', currentChat._id, ':', response.messages);
    };
    getMessages(); // This now runs only when currentChat changes and is valid
  }, [currentChat]); // Dependency on currentChat

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError, // Expose userChatsError
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError, // Expose messagesError
        sendTextMessage,
        sendTextMessageError,
        onlineUser
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
