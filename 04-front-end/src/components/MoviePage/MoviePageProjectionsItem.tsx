import React from "react";
import { Row, Col } from "react-bootstrap";
import IMoviePageProjectionsState from "./IMoviePageProjectionsState";

interface IMoviePageProjectionsItemProps {
  cinemas: IMoviePageProjectionsState;
}

export default function MoviePageProjectionsItem({
  cinemas,
}: IMoviePageProjectionsItemProps) {
  return (
    <Row key={cinemas.cinemaId} className="border-bottom my-5">
      <Col>
        <p className="m-0 fw-bold">{cinemas.cinemaName}</p>
      </Col>
      <Col>
        {cinemas.projections.map((p: any) => {
          const fullDate = new Date(p.startsAt + " UTC");
          const date = fullDate.toLocaleDateString("sr-RS");
          const time = fullDate.toLocaleTimeString("sr-RS", {
            hour: "numeric",
            minute: "numeric",
          });

          return (
            <p className="m-1" key={p.projectionId}>
              {date} {time}h
            </p>
          );
        })}
      </Col>
    </Row>
  );
}
