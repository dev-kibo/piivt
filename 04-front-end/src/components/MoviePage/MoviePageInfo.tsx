import React from "react";
import { Row, Col, Image, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import MovieModel from "../../../../03-back-end/src/components/movie/model";

interface IMoviePageInfoProps {
  movie: MovieModel;
}

export default function MoviePageInfo({ movie }: IMoviePageInfoProps) {
  return (
    <Row>
      <Col>
        <Row>
          <Col xs={5} md={4} lg={2}>
            <Image
              fluid
              src={`${movie.posterUrl.slice(
                0,
                movie.posterUrl.length - 4
              )}-small.jpg`}
            />
          </Col>
          <Col className="d-flex flex-column">
            <div>
              <h2>{movie.title}</h2>
              <h4>{new Date(movie.releasedAt).getFullYear()}</h4>
            </div>
            <p className="mt-auto">{movie.duration} minutes</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Nav
              justify
              variant="pills"
              className="border"
              defaultActiveKey={`/movies/${movie.movieId}`}
            >
              <Nav.Item>
                <NavLink
                  exact
                  to={`/movies/${movie.movieId}`}
                  className="nav-link"
                >
                  Projections
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to={`/movies/${movie.movieId}/details`}
                  className="nav-link"
                >
                  Details
                </NavLink>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
