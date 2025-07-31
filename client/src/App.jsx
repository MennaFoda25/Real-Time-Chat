import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContextProvider';
function App() {
  const { user} = useContext(AuthContext)
  //const user = localStorage.getItem('user');
  return (
    <ChatContextProvider user = {user}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat/> : <Login />} />
          <Route path="/register" element={user ? <Chat/> :<Register />} />
          <Route path="/login" element={user ? <Chat/> :<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}
export default App;
