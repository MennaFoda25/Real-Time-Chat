import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
//import PotentialChats from '../components/chat/PotentialChats';

const Chat = () => {
 // const {user} = useContext(AuthContext)
  const { userChats, isUserChatsLoading } = useContext(ChatContext);

   console.log('User Chats:', userChats);
  //console.log('Loading:', isUserChatsLoading);
  //console.log('Error:', userChatsError);

  // return (
  //   <Container>
  //     {userChats?.length < 1 ? null : (
  //       <Stack direction="horizontal" gap={4} className="align-items-start">
  //         <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
  //           {isUserChatsLoading && <p>Loading chats...</p>}
  //           {userChats?.map((chat,index)=>{
  //             return(
  //               <div key={index}>
                
  //                 <UserChat chat={chat} user={user}></UserChat>
  //               </div>
  //             )
  //           })}
  //           </Stack>
  //         <p>ChatBox</p>
  //       </Stack>
  //     )}
  //   </Container>
  // );

  return <>Chats</>
};

export default Chat;
