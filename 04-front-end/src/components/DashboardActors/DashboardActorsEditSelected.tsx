import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function DashboardActorsEditSelected() {
  return (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      <Col>
        <Form>
          <Form.Group className="pb-3">
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" placeholder="Enter name" size="lg" />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Middle name (optional):</Form.Label>
            <Form.Control type="text" placeholder="Enter name" size="lg" />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" placeholder="Enter name" size="lg" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Apply changes
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
