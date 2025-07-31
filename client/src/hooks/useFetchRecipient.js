import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  //if (!chat || !user?.data?._id) return;

  const recipientId = chat.members.find((id) => id !== user?.data?._id);
  console.log("🎯 Recipient ID:", recipientId);

useEffect(() => {

  const getUser = async () => {
    if (!recipientId) return null;

    const response = await getRequest(`${baseUrl}/users/${recipientId}`);
    if (response.error) {
      setError(response.error);
    } else {
      setRecipientUser(response.data);
    }
  };

  getUser();
}, []);


// useEffect(() => {
//   if (!chat || !user?.data?._id) return;

//   const currentUserId = user?.data?._id || user?._id;
//     if (!currentUserId) return;

//  const recipientId = chat.members.find((id) => id !== user?.data?._id);

//  if (!recipientId) return;
  
//   console.log("👤 Current user._id:", user?.data?._id);
//   console.log("📨 Chat members:", chat?.members);
//   console.log("🎯 Recipient ID found:", recipientId);



//   const getUser = async () => {
//     const response = await getRequest(`${baseUrl}/users/${recipientId}`);

//      // if (!recipientId) return;


//     //const response = await getRequest(`${baseUrl}/users/${recipientId}`);
//     if (response.error) {
//       setError(response.error);
//     } else {
//       setRecipientUser(response.data);
//     }
//   };

//   getUser();
// }, [chat, user]);


  return { recipientUser };
};

export default useFetchRecipientUser;



// import { useEffect, useState } from 'react';
// import { baseUrl, getRequest } from '../utils/services';

// export const useFetchRecipientUser = (chat, user) => {
//   const [recipientUser, setRecipientUser] = useState(null);
//   const [error, setError] = useState(null);

//  // const recipientId = chat?.members?.find((member) => member._id !== user?.data?._id)?._id;
// const recipientId = chat?.members?.find((m) => m._id !== user?._id)?._id;
// //   console.log('Chat', chat);
// //   console.log('User ID:', user?.data?._id);
// //   console.log('Chat Members:', chat?.members);
//  //   console.log('Recipient ID:', recipientId);

//   useEffect(() => {
     

// console.log("👤 Current user._id:", user?._id);
//     console.log("📨 Chat members:", chat?.members);
//     console.log("🎯 Recipient ID found:", recipientId);
//           const getUser = async () => {
//       if (!recipientId) return null;

//       const response = await getRequest(`${baseUrl}/users/${recipientId}`);
//       console.log('Response from user fetch:', response);
// //console.log("Recipient data:", recipientData);

//       if (response.error) {
//         setError(response.error);
//       } else {
//         setRecipientUser(response); // Make sure this sets the user
//       }
//     };

//     getUser();
//   }, [recipientId]);
//   return { recipientUser };
// };
// export default useFetchRecipientUser;
