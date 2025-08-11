// context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { serverDataContext } from './ServerContext';
import axios from 'axios';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(serverDataContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/getUser`, {
        withCredentials: true,
      });
      console.log("Current User Data:", response.data.user);
      setUserData(response.data.user); // ✅ only set the user object
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User not authenticated.");
        setUserData(null);
      } else {
        console.error("Error fetching current user:", error);
      }
    }finally {
      setLoading(false); // ✅ Set loading to false once done
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    loading // ✅ Include loading in context

  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
