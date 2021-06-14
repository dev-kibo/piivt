import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function MovieDeleteSelectedPage() {
  return (
    <Row className="align-items-center h-100">
      <Col className="d-flex flex-column align-items-center">
        <Row className="text-center">
          <Col>
            <p className="display-5">You want to delete Title (1989).</p>
            <p className="display-4">Are you sure?</p>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center mt-5" xs={1} md={4}>
          <Col>
            <Button variant="danger" type="button" size="lg" className="w-100">
              Yes
            </Button>
          </Col>
          <Col className="mt-3 mt-md-0">
            <Button
              variant="outline-secondary"
              type="button"
              size="lg"
              className="w-100"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
