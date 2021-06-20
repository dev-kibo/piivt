import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
