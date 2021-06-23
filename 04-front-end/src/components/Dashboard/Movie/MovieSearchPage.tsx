import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";
import MovieService from "../../../services/MovieService";
import BaseLink from "../BaseLink";

interface IMovieSearchPageProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function MovieSearchPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: IMovieSearchPageProps) {
  const [data, setData] = useState<MovieModel[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const res = await MovieService.getAll();

        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (value.length > 0) {
      try {
        const res = await MovieService.getBySearchTerm(value);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await MovieService.getAll();
      setData(res);
    }
  };

  return (
    <Row>
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
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
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