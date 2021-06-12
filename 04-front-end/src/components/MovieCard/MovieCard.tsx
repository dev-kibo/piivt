import React from "react";
import { Col, Card, Button, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";

export default function MovieCard() {
  return (
    <Col className="gy-4">
      <Link to="/" className="btn btn-outline-secondary">
        <Row className="text-start">
          <Col className="align-items-center d-flex">
            <Image fluid src={poster} className="img-thumb rounded" />
          </Col>
          <Col sm={8} xs={9} className="d-flex flex-column">
            <div>
              <h5>Title (1989)</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <p className="mt-auto">22:45h - Cinema 1</p>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}
