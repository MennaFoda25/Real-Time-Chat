import { useEffect, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { baseUrl, postRequest } from '../utils/services';



export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

 
  //console.log(('Login', loginInfo));

  useEffect(() => {
    const user = localStorage.getItem('User');
    if(user)
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(`${baseUrl}/users/register`, registerInfo);

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response.error);
      }
      localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );
 //console.log(('User', user));

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(`${baseUrl}/users/login`,  loginInfo);
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response.error);
      }
//console.log('Login response:', response);

      localStorage.setItem('User', JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem('User');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginInfo,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
