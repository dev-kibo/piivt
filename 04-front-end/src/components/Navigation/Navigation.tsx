import React from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";

export default function Navigation() {
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

  return (
    <Container fluid>
      <Row className="p-2 justify-content-between align-items-center">
        <Col xs={1}>{displayNav()}</Col>
        <Col className="d-flex align-items-center" xs={2}>
          <p className="m-0 me-3">bojan@example.com</p>
          <Button variant="outline-secondary">Sign out</Button>
        </Col>
      </Row>
    </Container>
  );
}
