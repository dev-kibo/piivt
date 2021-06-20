import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import EventRegister from "../api/EventRegister";

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    EventRegister.on("AUTH_EVENT", handleAuthEvent);
  }, []);

  function handleAuthEvent(status: string, data: any) {
    if (status === "user_login") {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken) {
        const user = JSON.parse(atob(accessToken.split(".")[1]));

        setCurrentUser(user);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
