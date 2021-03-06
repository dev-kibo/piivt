import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import IHomePageStateMovies from "./IHomePageStateMovies";
import useFetchRepertoire from "../../hooks/useFetchRepertoire";
import CustomAlert from "../Alert/CustomAlert";

interface IHomePageState {
  movies: IHomePageStateMovies[];
}

export default function HomePage() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);

  const [date, setDate] = useState<string>(today);
  const [data, setData] = useState<IHomePageState | null>(null);
  const [fetchInterval, setFetchInterval] = useState<number>(0);
  const [repertoire, error, isLoading] = useFetchRepertoire({
    date,
    fetchInterval,
  });

  const mapData = useCallback(() => {
    if (repertoire?.projections) {
      console.log("test");

      const movies: IHomePageStateMovies[] = [];

      for (const projection of repertoire.projections) {
        const movieIndex: number = movies.findIndex(
          (x) => x.movie.movieId === projection.movie?.movieId
        );
        if (movieIndex >= 0) {
          movies[movieIndex].projections.push({
            id: projection.projectionId,
            cinema: projection.cinema!,
            endsAt: projection.endsAt,
            startsAt: projection.startsAt,
          });
        } else {
          movies.push({
            movie: projection.movie!,
            projections: [
              {
                id: projection.projectionId,
                cinema: projection.cinema!,
                endsAt: projection.endsAt,
                startsAt: projection.startsAt,
              },
            ],
          });
        }
      }

      movies.forEach((movie) =>
        movie.projections.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        )
      );

      setData({
        movies,
      });
    } else {
      setData(null);
    }
  }, [repertoire?.projections]);

  useEffect(() => {
    const check = setInterval(
      () => setFetchInterval(fetchInterval + 10),
      60 * 1000
    );
    return () => clearInterval(check);
  }, [fetchInterval]);

  useEffect(() => {
    mapData();
  }, [mapData]);

  function generateOptions() {
    const dates: string[] = [];
    const day = new Date(Date.now());

    for (let i: number = 0; i < 7; i++) {
      dates.push(day.toISOString().slice(0, 10));

      day.setDate(day.getDate() + 1);
    }

    return dates.map((date: string) => {
      const today = new Date(Date.now());

      if (new Date(date).getDate() === today.getDate()) {
        return (
          <option key={date} value={date}>
            Today
          </option>
        );
      }

      // tomorrow
      today.setDate(today.getDate() + 1);

      if (new Date(date).getDate() === today.getDate()) {
        return (
          <option key={date} value={date}>
            Tomorrow
          </option>
        );
      }

      return (
        <option key={date} value={date}>
          {date}
        </option>
      );
    });
  }

  const renderBody = () => {
    if (isLoading) {
      return (
        <CustomAlert
          setIsAlertShown={() => true}
          message="Loading"
          variant="primary"
          isDismissible={false}
          isVisible={isLoading}
        />
      );
    }
    if (error?.status === 404) {
      return (
        <CustomAlert
          setIsAlertShown={() => true}
          message="No results"
          variant="secondary"
          isDismissible={false}
          isVisible={true}
        />
      );
    } else {
      return (
        <Row lg={2} xl={3} xs={1}>
          {data?.movies.map((x) => (
            <MovieCard key={x.movie.movieId} repertoire={x} />
          ))}
        </Row>
      );
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-end mb-5">
        <Col xs={4} lg={2}>
          <Form.Control
            as="select"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            {generateOptions()}
          </Form.Control>
        </Col>
      </Row>
      {renderBody()}
    </Container>
  );
}
