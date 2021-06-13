import React from "react";
import { Row, Col } from "react-bootstrap";
import DashboardLink from "./DashboardLink";

export default function Dashboard() {
  return (
    <Row className="h-100 align-items-center">
      <Col>
        <Row xs={1} lg={3} className="gy-4 justify-content-center">
          <DashboardLink
            path="/dashboard/cinemas"
            linkTitle="Cinemas"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/movies"
            linkTitle="Movies"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/actors"
            linkTitle="Actors"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/projections"
            linkTitle="Projections"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/repertoire"
            linkTitle="Repertoire"
            styleClass="btn-outline-secondary"
          />
        </Row>
      </Col>
    </Row>
  );
}
