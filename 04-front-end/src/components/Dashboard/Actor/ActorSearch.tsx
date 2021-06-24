import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ActorModel from "../../../../../03-back-end/src/components/actor/model";
import BaseLink from "../BaseLink";
import ActorService from "../../../services/ActorService";

interface IActorSearchProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function ActorSearch({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: IActorSearchProps) {
  const [data, setData] = useState<ActorModel[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const res = await ActorService.getAll();

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
        const res = await ActorService.search(e);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await ActorService.getAll();
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
          {data.map((x: ActorModel) => {
            console.log(x);
            const middleName = x.middleName
              ? x.middleName.slice(0, 1) + "."
              : "";
            return (
              <Item
                key={x?.actorId}
                title={`${x?.firstName} ${middleName} ${x.lastName}`}
                path={`${relativePath}/${x?.actorId}`}
                styleClass="btn-outline-secondary"
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
