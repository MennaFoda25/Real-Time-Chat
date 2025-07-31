// import { useContext } from 'react';
// import { ChatContext } from '../../context/ChatContext';
// import { AuthContext } from '../../context/AuthContext';

// const PotentialChats = () => {
//   const { user } = useContext(AuthContext);
//   const { potentialChats, createChat } = useContext(ChatContext);

//   return <>Start Chat</>
// //   return (
// //     <>
// //     <div className="all-users">
// //   {potentialChats?.length > 0 ? (
// //     potentialChats.map((u, index) => (
// //       <div className="single-user" key={u._id} onClick={() => createChat(user?.data?._id || user?._id, u._id)}>
// //         {u.name}
// //         <span className="user-online"></span>
// //       </div>
// //     ))
// //   ) : (
// //     <p>No users available</p>
// //   )}
// // </div>

// //     </>
// //   );
// };

// export default PotentialChats;
