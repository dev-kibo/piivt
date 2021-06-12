import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

export default function HomePage() {
  return (
    <Container>
      <Row className="justify-content-end mb-5">
        <Col lg={2}>
          <Form.Control as="select">
            <option>Today</option>
            <option>Tomorrow</option>
            <option>28-01-2021</option>
            <option>29-01-2021</option>
            <option>30-01-2021</option>
            <option>31-01-2021</option>
            <option>01-02-2021</option>
          </Form.Control>
        </Col>
      </Row>
      <Row lg={3} md={2} xs={1}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Row>
    </Container>
  );
}
