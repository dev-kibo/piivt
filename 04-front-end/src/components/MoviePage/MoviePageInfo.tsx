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
        <Row xs={1} xxl={2}>
          {/* xs={5} md={4} lg={2} */}
          <Col className="d-xxl-block d-flex" xxl={2}>
            <Image
              fluid
              src={`${movie.posterUrl.slice(
                0,
                movie.posterUrl.length - 4
              )}-small.jpg`}
            />
            <div className="d-flex flex-column ms-4 d-xxl-none">
              <h2>{movie.title}</h2>
              <h4>{new Date(movie.releasedAt).getFullYear()}</h4>
              <p className="mt-auto">{movie.duration} minutes</p>
            </div>
          </Col>
          <Col className="d-flex flex-column mt-3 mt-xxl-0" xxl={10}>
            <div className="d-none d-xxl-block">
              <h2>{movie.title}</h2>
              <h4>{new Date(movie.releasedAt).getFullYear()}</h4>
            </div>

            <p className="text-muted">{movie.description}</p>
            <p className="mt-auto d-xxl-block d-none">
              {movie.duration} minutes
            </p>
          </Col>
        </Row>
        <Row className="mt-3 mt-xxl-5">
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
