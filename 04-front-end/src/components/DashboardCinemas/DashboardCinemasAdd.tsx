import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function DashboardCinemasAdd() {
  return (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      <Col>
        <Form>
          <Form.Group>
            <Form.Label>Cinema name:</Form.Label>
            <Form.Control type="text" placeholder="Enter name" size="lg" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Add
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
