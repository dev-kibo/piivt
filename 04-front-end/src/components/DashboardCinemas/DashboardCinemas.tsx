import React from "react";
import { Row, Col } from "react-bootstrap";
import DashboardLink from "../Dashboard/DashboardLink";

export default function DashboardCinemas() {
  return (
    <Row className="h-100 align-items-center justify-content-center">
      <Col>
        <Row xs={1} lg={3} className="gy-4 justify-content-center">
          <DashboardLink
            path="/dashboard/cinemas/add"
            linkTitle="Add cinema"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/cinemas/edit"
            linkTitle="Edit cinema"
            styleClass="btn-outline-secondary"
          />
          <DashboardLink
            path="/dashboard/cinemas/delete"
            linkTitle="Delete cinema"
            styleClass="btn-outline-secondary"
          />
        </Row>
      </Col>
    </Row>
  );
}
