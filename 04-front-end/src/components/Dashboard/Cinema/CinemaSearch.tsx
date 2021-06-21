import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import CinemaService from "../../../services/CinemaService";
import BaseLink from "../BaseLink";

interface ICinemaSearchProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function CinemaSearch({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: ICinemaSearchProps) {
  const [data, setData] = useState<CinemaModel[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const res = await CinemaService.getAllCinemas();

        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const handleSearch = async (e: string) => {
    setSearch(e);

    if (e.length > 0) {
      try {
        const res = await CinemaService.searchCinemas(e);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await CinemaService.getAllCinemas();
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
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-center">
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
