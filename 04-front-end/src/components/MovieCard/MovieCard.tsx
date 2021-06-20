import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IHomePageStateMovies from "../HomePage/IHomePageStateMovies";

interface IMovieCardProps {
  repertoire: IHomePageStateMovies;
}

export default function MovieCard({ repertoire }: IMovieCardProps) {
  console.log(repertoire);

  const movie = repertoire.movie;
  const projections = repertoire.projections;
  const releasedAt = new Date(movie.releasedAt).getFullYear();

  function getTime(date: string): string {
    return new Date(date).toLocaleTimeString("sr-RS", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <Col className="gy-4">
      <Col className="gy-4">
        <Link
          to={`/movies/${movie.movieId}`}
          className="btn btn-outline-secondary"
        >
          <Row className="text-start">
            <Col className="align-items-center d-flex">
              <Image
                fluid
                src={`${movie.posterUrl.slice(
                  0,
                  movie.posterUrl.length - 4
                )}-small.jpg`}
                className="img-thumb rounded"
              />
            </Col>
            <Col sm={8} xs={9} className="d-flex flex-column">
              <div>
                <h5>
                  {movie.title} ({releasedAt})
                </h5>
                <p>{movie.description}</p>
              </div>
              {projections.map((x) => {
                return (
                  <p className="mt-auto" key={x.id}>
                    {getTime(x.startsAt)}h - {x.cinema.name}
                  </p>
                );
              })}
            </Col>
          </Row>
        </Link>
      </Col>
    </Col>
  );
}
