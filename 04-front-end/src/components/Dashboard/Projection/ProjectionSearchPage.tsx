import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ProjectionModel from "../../../../../03-back-end/src/components/projection/model";
import BaseLink from "../BaseLink";
import ProjectionService from "../../../services/ProjectionService";
import IData from "./IData";
import ProjectionUtility from "./ProjectionUtility";

interface ICinemaSearchProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function ProjectionSearchPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: ICinemaSearchProps) {
  const [data, setData] = useState<IData[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const res: ProjectionModel[] = await ProjectionService.getAll();
        const mappedData = await ProjectionUtility.mapData(res);

        setData(mappedData);
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
        const res = await ProjectionService.searchProjections(e);
        const mappedData = await ProjectionUtility.mapData(res);

        setData(mappedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await ProjectionService.getAll();
      const mappedData = await ProjectionUtility.mapData(res);

      setData(mappedData);
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
          {data.map((x: IData) => {
            const startsAtDate: string = new Date(
              x.startsAt
            ).toLocaleDateString("sr-RS");

            const startsAtTime: string = new Date(
              x.startsAt
            ).toLocaleTimeString("sr-RS", {
              hour: "numeric",
              minute: "numeric",
            });

            const releasedAtYear: number = new Date(
              x.movie.releasedAt
            ).getFullYear();

            return (
              <Item
                key={x?.projectionId}
                title={`${startsAtTime}h ${startsAtDate} ${x.movie.title} (${releasedAtYear}) - ${x.cinema.name}`}
                path={`${relativePath}/${x?.projectionId}`}
                styleClass="btn-outline-secondary"
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
