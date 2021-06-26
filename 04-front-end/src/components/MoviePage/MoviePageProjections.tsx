import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieModel from "../../../../03-back-end/src/components/movie/model";
import useFetchMovieProjections from "../../hooks/useFetchMovieProjections";
import MoviePageProjectionsItem from "./MoviePageProjectionsItem";
import IMoviePageProjectionsState from "./IMoviePageProjectionsState";

interface IMoviePageProjectionsProps {
  movie: MovieModel;
}

export default function MoviePageProjections({
  movie,
}: IMoviePageProjectionsProps) {
  const [projections, isLoading] = useFetchMovieProjections(movie.movieId);
  const [data, setData] = useState<IMoviePageProjectionsState[]>([]);

  useEffect(() => {
    const results: IMoviePageProjectionsState[] = [];

    if (projections.length > 0) {
      for (const projection of projections) {
        const cinemaIndex = results.findIndex(
          (x) => x.cinemaId === projection.cinema?.cinemaId
        );
        if (cinemaIndex >= 0) {
          results[cinemaIndex].projections.push({
            projectionId: projection.projectionId,
            startsAt: projection.startsAt,
          });
        } else {
          results.push({
            cinemaId: projection.cinema?.cinemaId!,
            cinemaName: projection.cinema!.name,
            projections: [
              {
                projectionId: projection.projectionId,
                startsAt: projection.startsAt,
              },
            ],
          });
        }
      }

      results.forEach((x) =>
        x.projections.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        )
      );

      setData(results);
    }
  }, [projections]);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  return (
    <Row xs={1} className="p-2">
      <Col>
        <Row>
          <Col>
            <h3>Cinema:</h3>
          </Col>
          <Col>
            <h3>Date:</h3>
          </Col>
        </Row>
        {data.map((x) => {
          return <MoviePageProjectionsItem key={x.cinemaId} cinemas={x} />;
        })}
      </Col>
    </Row>
  );
}
