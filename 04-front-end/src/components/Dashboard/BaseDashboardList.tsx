import React from "react";
import { Row, Col } from "react-bootstrap";
import DashboardLink from "./DashboardLink";

interface IBaseDashboardListProps {
  title: string;
  relativePath: string;
}

export default function BaseDashboardList({
  title,
  relativePath,
}: IBaseDashboardListProps) {
  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <p className="display-4 text-center">{title}</p>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} xl={4} className="gy-4 mt-5">
          <DashboardLink
            linkTitle="Cinema 1"
            path={relativePath}
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 2"
            path="/"
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 3"
            path="/"
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 4"
            path="/"
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 5"
            path="/"
            styleClass="btn-outline-primary"
          />
          <DashboardLink
            linkTitle="Cinema 6"
            path="/"
            styleClass="btn-outline-primary"
          />
        </Row>
      </Col>
    </Row>
  );
}
