import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function DashboardCinemasEditSelected() {
  return (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      <Col>
        <Form>
          <Form.Group>
            <Form.Label>New name:</Form.Label>
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
