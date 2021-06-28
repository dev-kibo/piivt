import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import EventRegister from "../api/EventRegister";
import AuthService from "../services/AuthService";
import AdminModel from "../../../03-back-end/src/components/admin/model";
import { Redirect, useLocation } from "react-router-dom";

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<AdminModel | null>(null);
  const location = useLocation();

  useEffect(() => {
    EventRegister.on("AUTH_EVENT", handleAuthEvent);
  }, []);

  useEffect(() => {
    async function fetch() {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken !== null) {
        try {
          setCurrentUser(await AuthService.getCurrentUser());
        } catch (error) {
          return <Redirect to={location.pathname} />;
        }
      }
    }

    fetch();
  }, [location.pathname]);

  function handleAuthEvent(status: string) {
    if (status === "user_login") {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken) {
        const user = JSON.parse(atob(accessToken.split(".")[1]));
        setCurrentUser(user);
      }
    } else if (status === "user_logout") {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");

      setCurrentUser(null);
    }
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
