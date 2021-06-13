import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import poster from "../../assets/poster.jpg";

interface IDashboardMoviesListItemProps {
  path: string;
}

export default function DashboardMoviesListItem({
  path,
}: IDashboardMoviesListItemProps) {
  return (
    <Col className="w-auto">
      <Link className="btn btn-outline-primary" to={path}>
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
