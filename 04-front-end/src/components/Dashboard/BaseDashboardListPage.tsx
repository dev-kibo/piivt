import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import BaseLink from "../Dashboard/BaseLink";

interface IBaseDashboardListPageProps {
  title: string;
  relativePath: string;
  searchLabel: string;
  item: typeof BaseLink;
}

export default function BaseDashboardListPage({
  title,
  relativePath,
  searchLabel,
  item: Item,
}: IBaseDashboardListPageProps) {
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
          <Item
            title="Edit Cinema 1"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          <Item
            title="Edit Cinema 2"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          <Item
            title="Edit Cinema 3"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          <Item
            title="Edit Cinema 4"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          <Item
            title="Edit Cinema 5"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          <Item
            title="Edit Cinema 6"
            path={relativePath}
            styleClass="btn-outline-secondary"
          />
          {/* <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          /> */}
        </Row>
      </Col>
    </Row>
  );
}
