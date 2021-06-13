import React from "react";
import { Row, Col } from "react-bootstrap";

export default function MoviePageProjections() {
  return (
    <Row xs={1} sm={2} className="border p-2">
      <Col className="">
        <p className="m-0">01-01-2021 22:45</p>
      </Col>
      <Col>
        <p className="m-0">Cinema 1, Cinema 3</p>
      </Col>
    </Row>
  );
}
