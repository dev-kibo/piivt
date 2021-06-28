import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";
import useFetchMovies from "../../../hooks/useFetchMovies";
import { withAuth } from "../../Hocs/withAuth";
import BaseLink from "../BaseLink";

interface IMovieSearchPageProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

function MovieSearchPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: IMovieSearchPageProps) {
  const [searchMovieQuery, setSearchMovieQuery] = useState<string>("");
  const [data] = useFetchMovies(searchMovieQuery);

  return (
    <Row className="align-items-center h-100">
      <Col>
        <Row>
          <Col className="text-center">
            <p className="m-0 display-5">{title}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Form.Group>
            <Form.Label>{searchLabel}:</Form.Label>
            <Form.Control
              type="text"
              value={searchMovieQuery}
              onChange={(e) => setSearchMovieQuery(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-start">
          {data.map((x: MovieModel) => {
            console.log(x);
            return (
              <Item
                key={x?.movieId}
                title={`${x?.title} (${new Date(x?.releasedAt).getFullYear()})`}
                path={`${relativePath}/${x?.movieId}`}
                styleClass="btn-outline-secondary"
                imagePath={x?.posterUrl}
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default withAuth(MovieSearchPage);
