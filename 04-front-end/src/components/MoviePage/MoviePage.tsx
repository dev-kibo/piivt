import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MoviePageInfo from "./MoviePageInfo";
import IParams from "../Common/IParams";
import useFetchMovie from "../../hooks/useFetchMovie";

interface IMoviePageProps {
  component: React.ComponentType<any>;
}

export default function MoviePage({ component: Component }: IMoviePageProps) {
  const { id } = useParams<IParams>();
  const [movie, isLoading] = useFetchMovie(+id);

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (!movie) {
    return <h2>Not found.</h2>;
  }

  return (
    <Row>
      <Col>
        <MoviePageInfo movie={movie} />
        <Col className="p-4">
          <Component movie={movie} />
        </Col>
      </Col>
    </Row>
  );
}
