// import { useEffect, useState } from 'react';
// import { baseUrl, getRequest } from '../utils/services';

// export const useFetchRecipientUser = (chat, user) => {
//   const [recipientUser, setRecipientUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Clear previous state when inputs change
//     setRecipientUser(null);
//     setError(null);
//     setIsLoading(false);

//     if (!chat || !chat.members || chat.members.length < 2 || !user) {
//       console.log('useFetchRecipientUser: Missing chat, chat.members, or user. Returning early.');
//       if (
//         chat &&
//         chat.members.length === 1 &&
//         chat.members[0]._id === (user?.data?._id || user?._id)
//       ) {
//         setError({ message: 'Malformed chat data: Only current user found in members.' });
//       }
//       return;
//     }

//     const currentUserId = user?.data?._id || user?._id;
//     if (!currentUserId) {
//       console.log('useFetchRecipientUser: currentUserId is null or undefined. User object:');
//       return;
//     }

//     const recipientMember = chat.members.find((member) => member._id !== currentUserId);

//     if (!recipientMember && chat.members.length === 1 && chat.members[0]._id === currentUserId) {
//       console.warn(
//         'useFetchRecipientUser: Malformed chat found: contains only the current user as a member.'
//       );
//       setError({ message: 'Malformed chat data: Only current user found in members.' });
//       return; // Exit early as we can't determine a recipient
//     }

//     const recipientId = recipientMember?._id;

//     console.log('useFetchRecipientUser: Fetched Recipient ID is:', recipientId);

//     //console.log('useFetchRecipientUser Debug:');
//     // console.log('  Current User ID:', currentUserId);
//     // console.log('  Chat Members (full objects):', chat.members);
//     // console.log('  Calculated Recipient Member Object:', recipientMember); // Log the object
//     // console.log('  Calculated Recipient ID (string):', recipientId); // Log the extracted ID

//     const getUser = async () => {
//       setIsLoading(true);

//       const response = await getRequest(`${baseUrl}/users/${recipientId}`);
//       setIsLoading(false);

//       if (response.error) {
//         setError(response.error);
//         setRecipientUser(null);
//       } else {
//         setRecipientUser(response);
//       }
//     };

//     // if (!recipientId) {
//     //   console.log(
//     //     'useFetchRecipientUser: No valid recipientId found after extraction, skipping fetch.'
//     //   );
//     //   setError('Recipient user ID could not be determined.');
//     //   return;
//     // }
//     // setIsLoading(true);

//     // const response = await getRequest(`${baseUrl}/users/${recipientId}`);

//     // setIsLoading(false);

//     // if (!recipientId) {
//     //   console.log(
//     //     'useFetchRecipientUser: No valid recipientId found after extraction, skipping fetch.'
//     //   );
//     //   setError('Recipient user ID could not be determined.');
//     //   return;
//     // }

//     // setIsLoading(true);

//     // setIsLoading(false); // Set loading to false regardless of success or error

//     // if (response.error) {
//     //   setError(response.error);
//     //   setRecipientUser(null);
//     // } else {
//     //   // console.log('useFetchRecipientUser: Successfully fetched recipient user:', response.data);
//     //   setRecipientUser(response.data);
//     // }
//     //};

//     getUser();
//   }, [chat, user]);

//   // useEffect(() => {
//   //   if (!chat || !user?.data?._id) return;

//   //   const currentUserId = user?.data?._id || user?._id;
//   //     if (!currentUserId) return;

//   //  const recipientId = chat.members.find((id) => id !== user?.data?._id);

//   //  if (!recipientId) return;

//   //   console.log("👤 Current user._id:", user?.data?._id);
//   //   console.log("📨 Chat members:", chat?.members);
//   //   console.log("🎯 Recipient ID found:", recipientId);

//   //   const getUser = async () => {
//   //     const response = await getRequest(`${baseUrl}/users/${recipientId}`);

//   //      // if (!recipientId) return;

//   //     //const response = await getRequest(`${baseUrl}/users/${recipientId}`);
//   //     if (response.error) {
//   //       setError(response.error);
//   //     } else {
//   //       setRecipientUser(response.data);
//   //     }
//   //   };

//   //   getUser();
//   // }, [chat, user]);

//   return { recipientUser, error, isLoading };
// };

// export default useFetchRecipientUser;

// // import { useEffect, useState } from 'react';
// // import { baseUrl, getRequest } from '../utils/services';

// // export const useFetchRecipientUser = (chat, user) => {
// //   const [recipientUser, setRecipientUser] = useState(null);
// //   const [error, setError] = useState(null);

// //  // const recipientId = chat?.members?.find((member) => member._id !== user?.data?._id)?._id;
// // const recipientId = chat?.members?.find((m) => m._id !== user?._id)?._id;
// // //   console.log('Chat', chat);
// // //   console.log('User ID:', user?.data?._id);
// // //   console.log('Chat Members:', chat?.members);
// //  //   console.log('Recipient ID:', recipientId);

// //   useEffect(() => {

// // console.log("👤 Current user._id:", user?._id);
// //     console.log("📨 Chat members:", chat?.members);
// //     console.log("🎯 Recipient ID found:", recipientId);
// //           const getUser = async () => {
// //       if (!recipientId) return null;

// //       const response = await getRequest(`${baseUrl}/users/${recipientId}`);
// //       console.log('Response from user fetch:', response);
// // //console.log("Recipient data:", recipientData);

// //       if (response.error) {
// //         setError(response.error);
// //       } else {
// //         setRecipientUser(response); // Make sure this sets the user
// //       }
// //     };

// //     getUser();
// //   }, [recipientId]);
// //   return { recipientUser };
// // };
// // export default useFetchRecipientUser;

import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      setRecipientUser(null);
    setError(null);
    setIsLoading(false);


    if (!chat || !chat.members || !Array.isArray(chat.members) || !user) {
      console.log('useFetchRecipientUser: Invalid chat data or user object. Returning early.');
      setError({ message: 'Error loading recipient: Invalid chat data.' });
      return;
    }

    const currentUserId = user?.data?._id || user?._id;
    if (!currentUserId) {
      console.log('useFetchRecipientUser: currentUserId is null or undefined. User object:', user);
      setError({ message: 'Error loading recipient: Current user ID not found.' });
      return;
    }

    //  if (chat.members.length < 2) {
    //   if (chat.members.length === 1 && chat.members[0]._id === currentUserId) {
    //     setError({ message: 'Malformed chat data: Only current user found in members.' });
    //   } else {
    //     setError({ message: 'Malformed chat data: Not enough members to find a recipient.' });
    //   }
    //   return;
    // }

    const recipientMember = chat.members.find((member) => {
        // FIX: Add a check for null or undefined members
        if (!member) {
            return false;
        }
        // If member is an object, use its _id
        if (typeof member === 'object' && member._id) {
            return member._id !== currentUserId;
        }
        // If member is a string (ID), compare directly
        return member !== currentUserId;
    });

    // Check if a recipient was found
    if (!recipientMember) {
        console.warn('useFetchRecipientUser: No recipient found in the chat members.');
        setError({ message: 'Recipient user ID could not be determined.' });
        return;
    }

    // Determine the recipient's ID based on the member object/string
    const recipientId = typeof recipientMember === 'object' ? recipientMember._id : recipientMember;

    if (!recipientId) {
      console.warn('useFetchRecipientUser: No valid recipient ID found after extraction.');
      setError({ message: 'Recipient user ID could not be determined.' });
      return;
    }
    //console.log('useFetchRecipientUser Debug:');
    // console.log('  Current User ID:', currentUserId);
    // console.log('  Chat Members (full objects):', chat.members);
    // console.log('  Calculated Recipient Member Object:', recipientMember); // Log the object
    // console.log('  Calculated Recipient ID (string):', recipientId); // Log the extracted ID

    const getUser = async () => {
      
      if (!recipientId) {
        console.log(
          'useFetchRecipientUser: No valid recipientId found after extraction, skipping fetch.'
        );
        setError('Recipient user ID could not be determined.');
        return;
      }

      setIsLoading(true);

      const response = await getRequest(`${baseUrl}/users/${recipientId}`);

      setIsLoading(false); // Set loading to false regardless of success or error

      if (response.error) {
        setError(response.error);
        setRecipientUser(null);
      } else {
        // console.log('useFetchRecipientUser: Successfully fetched recipient user:', response.data);
        setRecipientUser(response.data);
      }
    };

    getUser();
  }, [chat, user]);

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

  return { recipientUser, error, isLoading };
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
