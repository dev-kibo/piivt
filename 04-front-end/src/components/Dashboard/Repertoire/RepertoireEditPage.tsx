import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function RepertoireEditPage() {
  return (
    <Form>
      <Row xs={1} md={2}>
        <Col>
          <Form.Group className="pb-3">
            <Form.Label>Date:</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group as={Row} className="pb-3">
            <Form.Label column xs={8} md={7} lg={8}>
              Projection start:
            </Form.Label>
            <Col xs={4} md={5} lg={4}>
              <Form.Control type="text" placeholder="21:00" />
            </Col>
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Cinema:</Form.Label>
            <Form.Control as="select">
              <option value="Cinema 1">Cinema 1</option>
              <option value="Cinema 2">Cinema 2</option>
              <option value="Cinema 3">Cinema 3</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Search movie:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select">
              <option value="Cinema 1">Results</option>
              <option value="Cinema 2">Movie 1</option>
              <option value="Cinema 3">Movie 2</option>
            </Form.Control>
          </Form.Group>
          <Button
            variant="outline-primary"
            className="w-100 mt-3"
            type="button"
          >
            Add projection
          </Button>
        </Col>
        <Col>
          <div className="d-flex justify-content-between border p-2 mt-3 mt-md-0">
            <p className="m-0">Projection 1</p>
            <button type="button" className="btn-close"></button>
          </div>
        </Col>
      </Row>
      <Row xs={1} md={3} lg={4} className="justify-content-end mt-5">
        <Col>
          <Button variant="primary" type="submit" className="w-100" size="lg">
            Apply changes
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
