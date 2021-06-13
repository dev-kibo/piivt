import React from "react";
import { Row, Col } from "react-bootstrap";

export default function MoviePageDetails() {
  return (
    <Row>
      <Col>
        <Row>
          <Col className="border p-3">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              pariatur nam ex iusto quia molestiae natus facere consectetur
              temporibus consequatur sed similique, ipsum, laudantium ullam.
              Facilis illum tenetur, harum praesentium asperiores iusto placeat
              vitae adipisci deserunt culpa consequatur! Enim alias officiis
              quam nemo repellat qui autem perspiciatis eius consectetur! Qui?
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Roles</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row className="border p-3" xs={3}>
              <Col className="text-left">
                <p className="m-0">John Jr. Smith</p>
              </Col>
              <Col className="text-center">
                <p className="m-0">...</p>
              </Col>
              <Col className="text-left">
                <p className="m-0">Indy</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
