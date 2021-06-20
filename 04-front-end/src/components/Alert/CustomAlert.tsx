import React from "react";
import { Alert } from "react-bootstrap";

interface IAlertProps {
  setIsAlertShown: Function;
  message: string;
  variant: "success" | "danger";
}

export default function CustomAlert({
  setIsAlertShown,
  message,
  variant,
}: IAlertProps) {
  return (
    <Alert variant={variant} onClose={() => setIsAlertShown(false)} dismissible>
      <p className="m-0">{message}</p>
    </Alert>
  );
}
