import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieModel from "../../../../03-back-end/src/components/movie/model";
import ProjectionService from "../../services/ProjectionService";
import CinemaService from "../../services/CinemaService";

interface IMoviePageProjectionsProps {
  movie: MovieModel;
}

export default function MoviePageProjections({
  movie,
}: IMoviePageProjectionsProps) {
  const [projections, setProjections] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      const res = await ProjectionService.getProjectionsForMovie(movie.movieId);
      let mappedRes = await Promise.all(
        res.map(async (x) => {
          return {
            ...x,
            cinema: await CinemaService.getCinemaById(x.cinemaId),
          };
        })
      );
      mappedRes = mappedRes.sort((a, b) => {
        const date1 = new Date(a.startsAt);
        const date2 = new Date(b.startsAt);

        if (date1 < date2) {
          return -1;
        } else if (date1 === date2) {
          return 0;
        } else {
          return 1;
        }
      });
      setProjections(mappedRes);
    }
    fetch();
  }, [movie.movieId]);

  return (
    <Row xs={1} sm={2} className="border p-2">
      <Col>
        {projections.map((x) => {
          const fullDate = new Date(x.startsAt);
          const date = fullDate.toLocaleDateString("sr-RS");
          const time = fullDate.toLocaleTimeString("sr-RS", {
            hour: "numeric",
            minute: "numeric",
          });

          return (
            <Row key={x.projectionId}>
              <Col className="">
                <p className="m-0">
                  {date} {time}h
                </p>
              </Col>
              <Col>
                <p className="m-0">{x.cinema.name}</p>
              </Col>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
}
