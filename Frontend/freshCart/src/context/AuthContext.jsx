import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to fetch user data using token
  const fetchUser = async (token) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/get_user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    }
  };
    const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");   
    setUser(null);                    
  };
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      fetchUser(token); // ✅ fetch latest user data on app load
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
