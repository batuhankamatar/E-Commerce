import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const loginSuccess = (userData) => {
    const { token, ...otherInfo } = userData;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(otherInfo));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(otherInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loginSuccess, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
