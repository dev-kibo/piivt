import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function DashboardCinemasEditSelected() {
  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row className="justify-content-center" xs={1} md={2} xl={3}>
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">Edit Cinema 1</p>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>New name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      size="lg"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                  >
                    Apply changes
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
