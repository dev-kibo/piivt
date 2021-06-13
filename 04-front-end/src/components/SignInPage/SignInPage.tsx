import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function SignInPage() {
  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col sm={8} md={6} lg={4}>
        <Row className="mb-5 text-center text-muted">
          <Col>
            <h1>Sign in</h1>
          </Col>
        </Row>
        <Row>
          <Col className="border p-3 p-sm-5">
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button
                className="mt-5 w-100 rounded-pill"
                variant="primary"
                type="submit"
              >
                Sign in
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
