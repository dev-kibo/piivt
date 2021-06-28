import React from "react";
import AdminModel from "../../../03-back-end/src/components/admin/model";

export const AuthContext = React.createContext<AdminModel | null>(null);
