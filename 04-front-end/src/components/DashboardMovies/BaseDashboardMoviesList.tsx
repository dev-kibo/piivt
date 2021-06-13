import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import DashboardMoviesListItem from "./DashboardMoviesListItem";

interface BaseDashboardMvoiesListProps {
  relativePath: string;
}

export default function BaseDashboardMoviesList({
  relativePath,
}: BaseDashboardMvoiesListProps) {
  return (
    <Row>
      <Col>
        <Row>
          <Form.Group>
            <Form.Label>Search movie:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Row>
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-center">
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
          <DashboardMoviesListItem path={relativePath} />
        </Row>
      </Col>
    </Row>
  );
}
