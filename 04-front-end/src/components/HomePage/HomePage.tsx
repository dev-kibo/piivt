import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";
import RepertoireService from "../../services/RepertoireService";
import MovieService from "../../services/MovieService";
import CinemaService from "../../services/CinemaService";
import IHomePageStateMovies from "./IHomePageStateMovies";

interface IHomePageState {
  date: string;
  repertoireId: number;
  movies: {
    [key: string]: IHomePageStateMovies;
  };
}

export default function HomePage() {
  const [date, setDate] = useState<string>(new Date(Date.now()).toISOString());
  const [repertoire, setRepertoire] = useState<IHomePageState>({
    date: "",
    repertoireId: 0,
    movies: {},
  });

  useEffect(() => {
    async function fetch() {
      const res = await RepertoireService.getRepertoire(date);

      if (res !== null && res.projections) {
        console.log(res.projections);
        const test = await res.projections.reduce(async (all: any, proj) => {
          if (!all[proj.movieId]) {
            all[proj.movieId] = {
              movie: await MovieService.getById(proj.movieId),
              projections: await Promise.all(
                res
                  .projections!.filter((x) => x.movieId === proj.movieId)
                  .map(async (x) => ({
                    id: x.projectionId,
                    cinema: await CinemaService.getCinemaById(x.cinemaId),
                    startsAt: x.startsAt,
                    endsAt: x.endsAt,
                  }))
              ),
            };
          } else {
            all[proj.movieId].projections.push(
              await Promise.all(
                res
                  .projections!.filter((x) => x.movieId === proj.movieId)
                  .map(async (x) => ({
                    id: x.projectionId,
                    cinema: await CinemaService.getCinemaById(x.cinemaId),
                    startsAt: x.startsAt,
                    endsAt: x.endsAt,
                  }))
              )
            );
          }

          return all;
        }, {});

        setRepertoire({
          date: res?.date ?? new Date(Date.now()).toISOString(),
          repertoireId: res?.repertoireId ?? 0,
          movies: test,
        });
      }
    }
    fetch();
  }, [date]);

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

  return (
    <Container>
      <Row className="justify-content-end mb-5">
        <Col xs={4} lg={2}>
          <Form.Control as="select" onChange={(e) => setDate(e.target.value)}>
            {generateOptions()}
          </Form.Control>
        </Col>
      </Row>
      <Row lg={3} md={2} xs={1}>
        {Object.keys(repertoire.movies).length > 0 ? (
          Object.values(repertoire.movies).map((x) => (
            <MovieCard key={x.movie.movieId} repertoire={x} />
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </Row>
    </Container>
  );
}
