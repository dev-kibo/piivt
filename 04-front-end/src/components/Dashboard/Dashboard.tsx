import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <Row className="h-100 align-items-center">
      <Col>
        <Row xs={1} lg={3} className="gy-4 justify-content-center">
          <Col>
            <Link
              to="/dashboard/cinemas"
              className="btn btn-outline-secondary w-100 p-4"
            >
              <p className="m-0 display-5">Cinemas</p>
            </Link>
          </Col>
          <Col>
            <Link
              to="/dashboard/movies"
              className="btn btn-outline-secondary w-100 p-4"
            >
              <p className="m-0 display-5">Movies</p>
            </Link>
          </Col>
          <Col>
            <Link
              to="/dashboard/actors"
              className="btn btn-outline-secondary w-100 p-4"
            >
              <p className="m-0 display-5">Actors</p>
            </Link>
          </Col>
          <Col>
            <Link
              to="/dashboard/projections"
              className="btn btn-outline-secondary w-100 p-4"
            >
              <p className="m-0 display-5">Projections</p>
            </Link>
          </Col>
          <Col>
            <Link
              to="/dashboard/repertoire"
              className="btn btn-outline-secondary w-100 p-4"
            >
              <p className="m-0 display-5">Repertoire</p>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
