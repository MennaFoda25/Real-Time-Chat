import { useState, useEffect, useCallback } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import { ChatContext } from './ChatContext';

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const response = await getRequest(`${baseUrl}/users`);

  //     console.log('📦 Users API response:', response);

  //     if (response.error) {
  //       return console.log('Error fetching users:', response);
  //     }

  //     const usersArray = response.data; // ✅ extract array

  //     if (!Array.isArray(usersArray)) {
  //       console.error('Expected an array of users but got:', usersArray);
  //       return;
  //     }

  //     const currentUserId = user?.data?._id || user?._id;

  //     const pChats = usersArray.filter((u) => {
  //       if (currentUserId === u._id) return false;

  //       let isChatCreated = false;

  //       if (userChats) {
  //         isChatCreated = userChats.some((chat) => chat.members.includes(u._id));
  //       }
  //       return !isChatCreated;
  //     });
  //     setPotentialChats(pChats);
  //     console.log('✅ setPotentialChats →', pChats);
  //   };

  //   getUsers();
  // }, [userChats, user]);

  // const createChat = useCallback(
  //   async (firstId, secondId) => {
  //     console.log('Creating chat with:', { firstId, secondId }); // 🔍
  //     // Prevent duplicate chat
  //     const existingChat = userChats.find(
  //       (chat) => chat.members.includes(firstId) && chat.members.includes(secondId)
  //     );

  //     if (existingChat) return;

  //     const response = await postRequest(`${baseUrl}/chats`, {
  //       firstId,
  //       secondId,
  //     });

  //     if (response.error) {
  //       console.log('Error creating chat:', response);
  //       return;
  //     }

  //     setUserChats((prev) => [...prev, response]);
  //   },
  //   [userChats]
  // );

 useEffect(() => {
  const getUserChats = async () => {
    const userId = user?.data?._id || user?._id;
    

    if (!userId) return;

    setIsUserChatsLoading(true);
    setUserChatsError(null);

    const response = await getRequest(`${baseUrl}/chats/${userId}`);

    setIsUserChatsLoading(false);
     console.log("User chat response:", response); // ✅ inspect this

    if (response.error) {
      return setUserChatsError(response);
    }

    setUserChats(response);
  };

  getUserChats();
}, [user]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
      //  potentialChats,
      //  createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
