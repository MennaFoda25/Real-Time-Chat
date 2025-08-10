// import { useContext } from 'react';
// import { ChatContext } from '../../context/ChatContext';
// import { AuthContext } from '../../context/AuthContext';

// const PotentialChats = () => {
//   const { user } = useContext(AuthContext);
//   const { potentialChats, createChat } = useContext(ChatContext);
//   // console.log('Potential Chats:', potentialChats);

//   return (
//     <>
//       <div className="all-users">
//         {potentialChats &&
//           potentialChats.map((u, index) => {
//             return (
//               <div className="single-user" key={index} onClick={() => createChat(user._id, u._id)}>
//                 {u.name}
//                 <span className="user-online"></span>
//               </div>
//             );
//           })}
//       </div>
//     </>
//   );
//   //return <>Start Chat</>
//   //    return (
//   //      <>
//   //      <div className="all-users">
//   //    {potentialChats?.length > 0 ? (
//   //     potentialChats.map((u, index) => (
//   //       <div className="single-user" key={u._id} onClick={() => createChat(user?.data?._id || user?._id, u._id)}>
//   //         {u.name}
//   //         <span className="user-online"></span>
//   //       </div>
//   //     ))
//   //   ) : (
//   //     <p>No users available</p>
//   //    )}
//   //  </div>

//   //      </>
//   //   );
// };

// export default PotentialChats;

import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, isCreatingChat, onlineUser } = useContext(ChatContext);
  console.log('Potential Chats:', potentialChats);

  return (
    <>
      <div className="all-users">
        {potentialChats && potentialChats.length > 0 ? (
          potentialChats.map((u, index) => (
            //  return (
            <div
              className="single-user"
              key={index}
              onClick={
                !isCreatingChat ? () => createChat(user?.data?._id || user?._id, u._id) : null
              }
            >
              {u.name}
              <span
                className={onlineUser?.some((user) => user.userId === u?._id) ? 'user-online' : ''}
              ></span>
            </div>
          ))
        ) : (
          <p>No potential chats available.</p>
        )}
      </div>
    </>
  );
  //return <>Start Chat</>
  //    return (
  //      <>
  //      <div className="all-users">
  //    {potentialChats?.length > 0 ? (
  //     potentialChats.map((u, index) => (
  //       <div className="single-user" key={u._id} onClick={() => createChat(user?.data?._id || user?._id, u._id)}>
  //         {u.name}
  //         <span className="user-online"></span>
  //       </div>
  //     ))
  //   ) : (
  //     <p>No users available</p>
  //    )}
  //  </div>

  //      </>
  //   );
};

export default PotentialChats;
