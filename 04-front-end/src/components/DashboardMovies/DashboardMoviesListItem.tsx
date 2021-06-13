import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";

export default function DashboardMoviesListItem() {
  return (
    <Col className="w-auto">
      <Link className="btn btn-outline-primary" to="/dashboard/movies/edit/3">
        <Row>
          <Col>
            <Image src={poster} fluid />
          </Col>
          <Col>
            <h3>Title (1989)</h3>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}
