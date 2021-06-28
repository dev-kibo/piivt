import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import EventRegister from "../api/EventRegister";
import AuthService from "../services/AuthService";
import AdminModel from "../../../03-back-end/src/components/admin/model";
import { useHistory } from "react-router-dom";

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<AdminModel | null>(null);
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken !== null) {
        try {
          setCurrentUser(await AuthService.getCurrentUser());
        } catch (error) {
          history.push("/");
        }
      }
    }

    fetch();
    EventRegister.on("AUTH_EVENT", handleAuthEvent);
  }, [history]);

  function handleAuthEvent(status: string) {
    if (status === "user_login") {
      const accessToken = localStorage.getItem("access-token");

      if (accessToken) {
        const user = JSON.parse(atob(accessToken.split(".")[1]));

        setCurrentUser(user);
      }
    }
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
