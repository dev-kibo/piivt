import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function MovieAddPage() {
  return (
    <Form>
      <Row xs={1} lg={3}>
        <Col>
          <Form.Group className="pb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Release year:</Form.Label>
            <Form.Control
              type="number"
              min={4}
              max={4}
              step={1}
              placeholder="1984"
            />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Duration (minutes):</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={3}
              step={1}
              placeholder="96"
            />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Duration (minutes):</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={3}
              step={1}
              placeholder="96"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Poster:</Form.Label>
            <Form.File />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="pb-3">
            <Form.Label>Search actors:</Form.Label>
            <Form.Control type="text" placeholder="John Smith" />
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Search actors:</Form.Label>
            <Form.Control as="select">
              <option value="Results">Results</option>
              <option value="John Smith">John Smith</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Button type="button" variant="outline-primary w-100 mt-3">
            Add role
          </Button>
        </Col>
        <Col className="mt-3 mt-md-0">
          <div>
            <p className="m-0">Roles:</p>
          </div>
          <div className="border p-2 mt-2">
            <p className="m-0">John Smith Jr ... Indy</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs={12} lg={4} className="mt-5">
          <Button variant="primary" size="lg" type="submit" className="w-100">
            Add movie
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
