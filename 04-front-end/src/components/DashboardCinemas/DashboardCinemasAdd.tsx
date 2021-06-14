import React from "react";
import { Form, Button } from "react-bootstrap";

export default function DashboardCinemasAdd() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Cinema name:</Form.Label>
        <Form.Control type="text" placeholder="Enter name" size="lg" />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-4">
        Add
      </Button>
    </Form>
  );
}
