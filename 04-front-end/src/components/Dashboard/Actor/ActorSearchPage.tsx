import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ActorModel from "../../../../../03-back-end/src/components/actor/model";
import BaseLink from "../BaseLink";
import useFetchActors from "../../../hooks/useFetchActors";
import { withAuth } from "../../Hocs/withAuth";

interface IActorSearchProps {
  title: string;
  searchLabel: string;
  item: typeof BaseLink;
  relativePath: string;
}

function ActorSearchPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: IActorSearchProps) {
  const [searchActorQuery, setSearchActorQuery] = useState<string>("");
  const [data] = useFetchActors(searchActorQuery);

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
              value={searchActorQuery}
              onChange={(e) => setSearchActorQuery(e.target.value)}
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

export default withAuth(ActorSearchPage);
