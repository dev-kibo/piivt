import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MovieService from "../../services/MovieService";
import MovieModel from "../../../../03-back-end/src/components/movie/model";
import MoviePageInfo from "./MoviePageInfo";
import IParams from "../Common/IParams";

interface IMoviePageProps {
  component: React.ComponentType<any>;
}

export default function MoviePage({ component: Component }: IMoviePageProps) {
  const [movie, setMovie] = useState<MovieModel>({
    description: "",
    duration: 0,
    movieId: 0,
    posterUrl: "",
    releasedAt: "",
    title: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams<IParams>();

  useEffect(() => {
    MovieService.getById(+id).then((x) => {
      setMovie(x);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <h2>Loading....</h2>;
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
