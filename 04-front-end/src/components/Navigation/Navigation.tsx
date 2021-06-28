import React from "react";
import { Row, Button, Col, DropdownButton, Dropdown } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import AdminModel from "../../../../03-back-end/src/components/admin/model";
import EventRegister from "../../api/EventRegister";

interface INavigationProps {
  admin: AdminModel;
}

export default function Navigation({ admin }: INavigationProps) {
  const history = useHistory();
  const location = useLocation();

  const displayNav = () => {
    if (location.pathname === "/dashboard") {
      return (
        <Button
          variant="outline-info"
          size="lg"
          onClick={() => history.push("/")}
        >
          Home
        </Button>
      );
    } else if (location.pathname === "/") {
      return (
        <Button
          variant="outline-info"
          size="lg"
          onClick={() => history.push("/dashboard")}
        >
          Dashboard
        </Button>
      );
    }

    return (
      <Button variant="outline-info" size="lg" onClick={() => history.goBack()}>
        Back
      </Button>
    );
  };

  const handleSignOut = () => {
    EventRegister.emit("AUTH_EVENT", "user_logout");
  };

  return (
    <nav className="border-bottom navbar fixed-top">
      <Row className="w-100 align-items-center px-2">
        <Col xs={6}>{displayNav()}</Col>
        <Col xs={6} className="d-flex align-items-center justify-content-end">
          <p className="m-0 me-3">{admin.email}</p>
          <DropdownButton title="Options" variant="outline-dark">
            <Dropdown.Item as="button" onClick={handleSignOut}>
              Sign out
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </nav>
  );
}
