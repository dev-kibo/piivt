import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IHomePageStateMovies from "../HomePage/IHomePageStateMovies";

interface IMovieCardProps {
  repertoire: IHomePageStateMovies;
}

export default function MovieCard({ repertoire }: IMovieCardProps) {
  const movie = repertoire.movie;
  const projections = repertoire.projections;
  const releasedAt = new Date(movie.releasedAt).getFullYear();

  function getTime(value: string): string {
    const date: Date = new Date(value);
    const minutes: string = date.getMinutes().toString();

    return `${date.getHours()}:${
      minutes.length > 1 ? minutes : minutes.padEnd(2, "0")
    }`;
  }

  function formatDescription(value: string): string {
    const allowedLetters = 110;
    return value.length > allowedLetters
      ? value.slice(0, allowedLetters) + "..."
      : value;
  }

  return (
    <Col className="gy-4">
      <Link
        to={`/movies/${movie.movieId}`}
        className="btn btn-outline-light text-muted h-100 shadow-sm"
      >
        <Row className="text-start h-100">
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
              <div>
                <p>{formatDescription(movie.description)}</p>
              </div>
            </div>
            <p className="mt-auto">
              First projection at {getTime(projections[0].startsAt)}h
            </p>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}
