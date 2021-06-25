import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import BaseLink from "../BaseLink";
import useFetchCinemas from "../../../hooks/useFetchCinemas";

interface ICinemaSearchProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function CinemaSearchPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: ICinemaSearchProps) {
  const [search, setSearch] = useState<string>("");
  const [data] = useFetchCinemas(search);

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
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row
          xs={1}
          md={2}
          lg={3}
          xxl={4}
          className="gy-4 mt-5 justify-content-start"
        >
          {data.map((x: any) => {
            console.log(x);
            return (
              <Item
                key={x?.cinemaId}
                title={x?.name}
                path={`${relativePath}/${x?.cinemaId}`}
                styleClass="btn-outline-secondary"
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
