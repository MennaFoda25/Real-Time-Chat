// // import { useContext, useState } from 'react';
// // import { ChatContext } from '../context/ChatContext';
// // import { Container, Stack } from 'react-bootstrap';
// // import UserChat from '../components/chat/UserChat';
// // import { AuthContext } from '../context/AuthContext';
// // import PotentialChats from '../components/chat/PotentialChats';
// // import ChatBox from '../components/chat/ChatBox';

// // const Chat = () => {
// //   const { user } = useContext(AuthContext);
// //   const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
// //   const [selectedChat, setSelectedChat] = useState(null);
// //   // console.log('User Chats:', userChats);
// //   // //console.log('Loading:', isUserChatsLoading);
// //   // //console.log('Error:', userChatsError);

// //   //console.log('Loading:', isUserChatsLoading);
// //   //console.log('Error:', userChatsError);

// //   // const handleChatSelection = (chat, recipientUser) => {
// //   //   // Create a new object that includes the chat details and the recipient user
// //   //   setSelectedChat({ ...chat, recipientUser });
// //   //   // In a real app, you might also fetch messages for this chat here or in ChatBox
// //   // };
// //   const handleCreateChat = (firstId, secondId) => {
// //     console.log('Chat.jsx: Creating new chat with:', { firstId, secondId });
// //     createChat(firstId, secondId); // Call createChat from context
// //   };
// //   return (
// //     <Container>
// //       <PotentialChats onCreateChat={handleCreateChat} />
// //       {userChats?.length < 1 && !isUserChatsLoading ? (
// //         <p>No chats found. Start a new one!</p>
// //       ) : null}
// //       {userChats?.length > 0 || isUserChatsLoading ? (
// //         <Stack direction="horizontal" gap={4} className="align-items-start">
// //           <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
// //             {isUserChatsLoading && <p>Loading chats...</p>}
// //             {userChats?.map((chat, index) => {
// //               return (
// //                 <div
// //                   key={chat._id || index}
// //                   onClick={() => {
// //                     updateCurrentChat(chat);
// //                   }}
// //                 >
// //                   <UserChat chat={chat} user={user} />
// //                 </div>
// //                 // <UserChat
// //                 //   key={chat._id || index} onClick={() => updateCrrentChat(chat)}  // Use chat._id for key if available, better than index
// //                 //   chat={chat}
// //                 //   user={user}
// //                 //   onSelectChat={(recipientUser) => handleChatSelection(chat, recipientUser)} // Pass callback
// //                 //   isSelected={selectedChat?._id === chat._id} // Pass prop to highlight
// //                 // />
// //               );
// //             })}
// //           </Stack>
// //           <ChatBox />
// //         </Stack>
// //       ) : null}
// //     </Container>
// //   );
// // };

// // export default Chat;

// import { useContext, useState } from 'react';
// import { ChatContext } from '../context/ChatContext';
// import { Container, Stack } from 'react-bootstrap';
// import UserChat from '../components/chat/UserChat';
// import { AuthContext } from '../context/AuthContext';
// import PotentialChats from '../components/chat/PotentialChats';
// import ChatBox from '../components/chat/ChatBox';

// const Chat = () => {
//   const { user } = useContext(AuthContext);
//   // Get updateCurrentChat and currentChat from context for direct use in Chat.jsx
//   const {
//     userChats,
//     isUserChatsLoading,
//     userChatsError,
//     updateCurrentChat,
//     currentChat,
//     createChat,
//   } = useContext(ChatContext); // Added currentChat and createChat

//   // Removed local selectedChat state, as currentChat from context will now serve this purpose for ChatBox.
//   // If you need it for visual highlighting within Chat.jsx itself, you'd re-introduce it and manage its state,
//   // but the source of truth for ChatBox's recipient is currentChat from context.

//   // console.log('User Chats:', userChats);

//   // handleCreateChat was in the wrong place, it should be passed to PotentialChats or similar.
//   // Re-introducing it here, assuming it's for the PotentialChats component
//   const handleCreateChat = (firstId, secondId) => {
//     console.log('Chat.jsx: Creating new chat with:', { firstId, secondId });
//     createChat(firstId, secondId); // Call createChat from context
//   };

//   return (
//     <Container>
//       {/* Pass handleCreateChat to PotentialChats if it's responsible for creating chats */}
//       {/* You'll need to update PotentialChats to accept and use this prop */}
//       <PotentialChats onCreateChat={handleCreateChat} />{' '}
//       {/* <--- Pass handler for creating new chats */}
//       {userChats?.length < 1 && !isUserChatsLoading && !userChatsError ? ( // Added userChatsError check
//         <p>No chats found. Start a new one!</p>
//       ) : null}
//       {userChatsError && (
//         <p className="text-danger">Error loading user chats: {userChatsError.message}</p>
//       )}{' '}
//       {/* Display chat loading error */}
//       {userChats?.length > 0 || isUserChatsLoading ? ( // Only render this if there are chats or loading
//         <Stack direction="horizontal" gap={4} className="align-items-start">
//           <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
//             {isUserChatsLoading && <p>Loading chats...</p>}
//             {/* Iterate over userChats and render UserChat */}
//             {userChats?.map((chat, index) => {
//               return (
//                 // The div now acts as the clickable wrapper for UserChat
//                 // We pass the isSelected prop to UserChat for highlighting
//                 <div
//                   key={chat._id || index}
//                   onClick={() => {
//                     console.log('Chat.jsx: Chat card clicked, updating current chat:', chat);
//                     updateCurrentChat(chat); // This is the crucial call to update context
//                   }}
//                   // Add a class for highlighting if needed, based on currentChat from context
//                   className={currentChat?._id === chat._id ? 'user-chat-selected' : ''}
//                 >
//                   <UserChat
//                     chat={chat}
//                     user={user}
//                     // No need for onSelectChat prop here, as the div handles the click directly
//                     // isSelected={currentChat?._id === chat._id} // UserChat can get this from its own props if you prefer internal management
//                   />
//                 </div>
//               );
//             })}
//           </Stack>
//           {/* ChatBox directly consumes currentChat from ChatContext */}
//           <ChatBox />
//         </Stack>
//       ) : null}
//     </Container>
//   );
// };

// export default Chat;



// import { useContext, useState } from 'react';
// import { ChatContext } from '../context/ChatContext';
// import { Container, Stack } from 'react-bootstrap';
// import UserChat from '../components/chat/UserChat';
// import { AuthContext } from '../context/AuthContext';
// import PotentialChats from '../components/chat/PotentialChats';
// import ChatBox from '../components/chat/ChatBox';

// const Chat = () => {
//   const { user } = useContext(AuthContext);
//   const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
//   const [selectedChat, setSelectedChat] = useState(null);
//   // console.log('User Chats:', userChats);
//   // //console.log('Loading:', isUserChatsLoading);
//   // //console.log('Error:', userChatsError);

//   //console.log('Loading:', isUserChatsLoading);
//   //console.log('Error:', userChatsError);

//   // const handleChatSelection = (chat, recipientUser) => {
//   //   // Create a new object that includes the chat details and the recipient user
//   //   setSelectedChat({ ...chat, recipientUser });
//   //   // In a real app, you might also fetch messages for this chat here or in ChatBox
//   // };
//   const handleCreateChat = (firstId, secondId) => {
//     console.log('Chat.jsx: Creating new chat with:', { firstId, secondId });
//     createChat(firstId, secondId); // Call createChat from context
//   };
//   return (
//     <Container>
//       <PotentialChats onCreateChat={handleCreateChat} />
//       {userChats?.length < 1 && !isUserChatsLoading ? (
//         <p>No chats found. Start a new one!</p>
//       ) : null}
//       {userChats?.length > 0 || isUserChatsLoading ? (
//         <Stack direction="horizontal" gap={4} className="align-items-start">
//           <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
//             {isUserChatsLoading && <p>Loading chats...</p>}
//             {userChats?.map((chat, index) => {
//               return (
//                 <div
//                   key={chat._id || index}
//                   onClick={() => {
//                     updateCurrentChat(chat);
//                   }}
//                 >
//                   <UserChat chat={chat} user={user} />
//                 </div>
//                 // <UserChat
//                 //   key={chat._id || index} onClick={() => updateCrrentChat(chat)}  // Use chat._id for key if available, better than index
//                 //   chat={chat}
//                 //   user={user}
//                 //   onSelectChat={(recipientUser) => handleChatSelection(chat, recipientUser)} // Pass callback
//                 //   isSelected={selectedChat?._id === chat._id} // Pass prop to highlight
//                 // />
//               );
//             })}
//           </Stack>
//           <ChatBox />
//         </Stack>
//       ) : null}
//     </Container>
//   );
// };

// export default Chat;

import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const { user } = useContext(AuthContext);
  // Get updateCurrentChat and currentChat from context for direct use in Chat.jsx
  const {
    userChats,
    isUserChatsLoading,
    userChatsError,
    updateCurrentChat,
    currentChat,
    createChat,
  } = useContext(ChatContext); // Added currentChat and createChat

  // Removed local selectedChat state, as currentChat from context will now serve this purpose for ChatBox.
  // If you need it for visual highlighting within Chat.jsx itself, you'd re-introduce it and manage its state,
  // but the source of truth for ChatBox's recipient is currentChat from context.

  // console.log('User Chats:', userChats);

  // handleCreateChat was in the wrong place, it should be passed to PotentialChats or similar.
  // Re-introducing it here, assuming it's for the PotentialChats component
  const handleCreateChat = (firstId, secondId) => {
    console.log('Chat.jsx: Creating new chat with:', { firstId, secondId });
    createChat(firstId, secondId); // Call createChat from context
  };

  return (
    <Container>
      {/* Pass handleCreateChat to PotentialChats if it's responsible for creating chats */}
      {/* You'll need to update PotentialChats to accept and use this prop */}
      <PotentialChats onCreateChat={handleCreateChat} />{' '}
      {/* <--- Pass handler for creating new chats */}
      {userChats?.length < 1 && !isUserChatsLoading && !userChatsError ? ( // Added userChatsError check
        <p>No chats found. Start a new one!</p>
      ) : null}
      {userChatsError && (
        <p className="text-danger">Error loading user chats: {userChatsError.message}</p>
      )}{' '}
      {/* Display chat loading error */}
      {userChats?.length > 0 || isUserChatsLoading ? ( // Only render this if there are chats or loading
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {/* Iterate over userChats and render UserChat */}
            {userChats?.map((chat, index) => {
              return (
                // The div now acts as the clickable wrapper for UserChat
                // We pass the isSelected prop to UserChat for highlighting
                <div
                  key={chat._id || index}
                  onClick={() => {
                    console.log('Chat.jsx: Chat card clicked, updating current chat:', chat);
                    updateCurrentChat(chat); // This is the crucial call to update context
                  }}
                  // Add a class for highlighting if needed, based on currentChat from context
                  className={currentChat?._id === chat._id ? 'user-chat-selected' : ''}
                >
                  <UserChat
                    chat={chat}
                    user={user}
                    // No need for onSelectChat prop here, as the div handles the click directly
                    // isSelected={currentChat?._id === chat._id} // UserChat can get this from its own props if you prefer internal management
                  />
                </div>
              );
            })}
          </Stack>
          {/* ChatBox directly consumes currentChat from ChatContext */}
          <ChatBox />
        </Stack>
      ) : null}
    </Container>
  );
};

export default Chat;