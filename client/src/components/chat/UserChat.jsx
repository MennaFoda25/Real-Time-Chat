import { Stack } from 'react-bootstrap';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import avatar from '../../assets/avatar.png';
 import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';

// Remove onSelectChat and isSelected from props here
const UserChat = ({ chat, user }) => {
  // <--- Props simplified
  const {
    recipientUser,
    error: recipientError,
    isLoading: recipientLoading,
  } = useFetchRecipientUser(chat, user);

  const {onlineUser} = useContext(ChatContext)

  const isOnline = onlineUser?.some((user)=> user?.userId === recipientUser?._id)

  if (recipientLoading) {
    return <p>Loading recipient...</p>;
  }
  if (recipientError) {
    return <p style={{ color: 'red' }}>Error loading recipient: {recipientError.message}</p>;
  }
  if (!recipientUser) {
    return <p>Recipient not found.</p>;
  }
 // console.log("recipient", recipientUser)

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      // onClick handler removed from here, now managed by parent div
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" alt="User Avatar" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name || 'Unknown User'}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2025</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnline? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;