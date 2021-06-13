import React from "react";
import { Row, Col, Image, Nav } from "react-bootstrap";
import poster from "../../assets/poster.jpg";
import { NavLink } from "react-router-dom";

interface MoviePageProps {
  component: React.ComponentType;
}

export default function MoviePage({
  component: MoviePageBody,
}: MoviePageProps) {
  return (
    <Row>
      <Col>
        <Row>
          <Col xs={5} md={4} lg={2}>
            <Image fluid src={poster} />
          </Col>
          <Col className="d-flex flex-column">
            <div>
              <h2>Title</h2>
              <h4>1989</h4>
            </div>
            <p className="mt-auto">121 minutes</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Nav
              justify
              variant="pills"
              className="border"
              defaultActiveKey="/movies/3"
            >
              <Nav.Item>
                <NavLink exact to="/movies/3" className="nav-link">
                  Projections
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/movies/3/details" className="nav-link">
                  Details
                </NavLink>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="p-4">
            <MoviePageBody />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
