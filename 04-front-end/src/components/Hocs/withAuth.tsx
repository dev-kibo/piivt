import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect, useLocation } from "react-router-dom";

export function withAuth(Component: React.ComponentType<any>) {
  const WrappedComponent = (props: any) => {
    const admin = useContext(AuthContext);
    const location = useLocation();

    if (admin !== null) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/admin",
            state: {
              referrer: location.pathname,
            },
          }}
        />
      );
    }
  };

  return WrappedComponent;
}
