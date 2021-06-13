import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import BaseDashboardMoviesList from "./BaseDashboardMoviesList";

export default function DashboardMoviesEdit() {
  return (
    // <Row>
    //   <Col>
    //     <Row>
    //       <Form.Group>
    //         <Form.Label>Search movie:</Form.Label>
    //         <Form.Control type="text" />
    //       </Form.Group>
    //     </Row>
    // <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-center">
    <BaseDashboardMoviesList relativePath="/dashboard/movies/edit/3" />
    // </Row>
    //   </Col>
    // </Row>
  );
}
