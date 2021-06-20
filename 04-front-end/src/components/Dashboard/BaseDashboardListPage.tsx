import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import BaseLink from "../Dashboard/BaseLink";
import CinemaService from "../../services/CinemaService";

interface IBaseDashboardListPageProps {
  title: string;
  relativePath: string;
  searchLabel: string;
  item: typeof BaseLink;
  type: "cinema" | "movie" | "actor" | "projection" | "repertoire";
  action: "get" | "delete";
}

export default function BaseDashboardListPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
  type,
  action,
}: IBaseDashboardListPageProps) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    switch (type) {
      case "cinema":
        handleAction(action);
        break;
    }
  }, [type, action]);

  const handleAction = async (action: "get" | "delete") => {
    if (action === "get") {
      try {
        const res = await CinemaService.getAllCinemas();

        setData(res);
      } catch (error) {
        console.log(error);
      }
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
            <Form.Control type="text" />
          </Form.Group>
        </Row>
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-center">
          {data.map((x: any) => {
            console.log(x);
            return (
              <Item
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
