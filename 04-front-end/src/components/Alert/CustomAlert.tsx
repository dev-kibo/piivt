import React from "react";
import { Alert } from "react-bootstrap";

interface IAlertProps {
  setIsAlertShown: Function;
  message: string;
  variant: "success" | "danger" | "primary" | "secondary";
  isDismissible?: boolean;
  isVisible?: boolean;
}

export default function CustomAlert({
  setIsAlertShown,
  message,
  variant,
  isDismissible = true,
  isVisible = true,
}: IAlertProps) {
  if (!isVisible) {
    return <></>;
  } else {
    return (
      <Alert
        variant={variant}
        onClose={() => setIsAlertShown(false)}
        dismissible={isDismissible}
      >
        <p className="m-0">{message}</p>
      </Alert>
    );
  }
}
