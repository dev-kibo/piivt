import React from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLink from "./DashboardLink";
import IBaseOptionsProps from "./IBaseOptionsProps";

export default function BaseOptions({ options }: IBaseOptionsProps) {
  return (
    <Col>
      <Row xs={1} lg={3} className="gy-4 justify-content-center">
        {options.map((option) => (
          <DashboardLink
            path={option.path}
            linkTitle={option.name}
            styleClass="btn-outline-secondary"
          />
        ))}
      </Row>
    </Col>
  );
}
