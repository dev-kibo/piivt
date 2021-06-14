import React from "react";
import { Form, Button } from "react-bootstrap";

export default function DashboardProjectionsEditSelected() {
  return (
    <Form>
      <Form.Group className="pb-3">
        <Form.Label>Starts at:</Form.Label>
        <Form.Control type="text" placeholder="21:00" />
      </Form.Group>
      <Form.Group className="pb-3">
        <Form.Label>Ends at:</Form.Label>
        <Form.Control type="text" placeholder="21:00" />
      </Form.Group>
      <Form.Group className="pb-3">
        <Form.Label>Cinema:</Form.Label>
        <Form.Control as="select">
          <option value="Cinema 1">Cinema 1</option>
          <option value="Cinema 2">Cinema 2</option>
          <option value="Cinema 3">Cinema 3</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" className="w-100">
        Apply changes
      </Button>
    </Form>
  );
}
