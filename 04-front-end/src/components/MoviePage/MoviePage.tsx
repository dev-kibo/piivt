import React, { useState } from "react";
import { Row, Col, Image, Nav } from "react-bootstrap";
import poster from "../../assets/poster.jpg";
import { NavLink, Switch, Route } from "react-router-dom";
import MoviePageBody from "./MoviePageBody";
import IMoviePageBodyProps from "./IMoviePageBodyProps";

export default function MoviePage() {
  const [bodyType, setBodyType] = useState<IMoviePageBodyProps>({
    type: "projections",
  });

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
            <Nav justify variant="pills" defaultActiveKey="#projections">
              <Nav.Item>
                <Nav.Link
                  href="#projections"
                  className="nav-link"
                  onClick={() => setBodyType({ type: "projections" })}
                >
                  Projections
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#details"
                  className="nav-link"
                  onClick={() => setBodyType({ type: "details" })}
                >
                  Details
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <MoviePageBody type={bodyType.type} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
