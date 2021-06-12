import React from "react";
import IMoviePageBodyProps from "./IMoviePageBodyProps";
import { Row, Col } from "react-bootstrap";

export default function MoviePageBody({ type }: IMoviePageBodyProps) {
  if (type === "projections") {
    return (
      <Row className="mt-5 border mx-1">
        <Col className="d-flex justify-content-center align-items-center p-2">
          <p className="my-0">01-01-2021 22:45</p>
          <p className="ms-5 my-0">Cinema 1, Cinema 3</p>
        </Col>
      </Row>
    );
  } else if (type === "details") {
    return <p>Details</p>;
  }

  return <p>Nothing</p>;
}
