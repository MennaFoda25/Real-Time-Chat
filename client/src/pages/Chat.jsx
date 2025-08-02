import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
//import PotentialChats from '../components/chat/PotentialChats';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading } = useContext(ChatContext);
  const [selectedChat, setSelectedChat] = useState(null);
  console.log('User Chats:', userChats);
  // //console.log('Loading:', isUserChatsLoading);
  // //console.log('Error:', userChatsError);

   //console.log('Loading:', isUserChatsLoading);
  //console.log('Error:', userChatsError);

   const handleChatSelection = (chat, recipientUser) => {
        // Create a new object that includes the chat details and the recipient user
        setSelectedChat({ ...chat, recipientUser });
        // In a real app, you might also fetch messages for this chat here or in ChatBox
    };
  return (
    <Container>

      {userChats?.length < 1 && !isUserChatsLoading ? <p>No chats found. Start a new one!</p> : null}
      {userChats?.length > 0 || isUserChatsLoading ? (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat,index)=>{
              return(
               <UserChat
                                    key={chat._id || index} // Use chat._id for key if available, better than index
                                    chat={chat}
                                    user={user}
                                    onSelectChat={(recipientUser) => handleChatSelection(chat, recipientUser)} // Pass callback
                                    isSelected={selectedChat?._id === chat._id} // Pass prop to highlight
                                />
              )
            })}
            </Stack>
          <p>ChatBox</p>
        </Stack>
      ): null}
    </Container>
  );
};

export default Chat;
