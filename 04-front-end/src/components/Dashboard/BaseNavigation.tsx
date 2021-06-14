import React from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLink from "./DashboardLink";
import IBaseNavigationProps from "./IBaseNavigationProps";

export default function BaseNavigation({ options }: IBaseNavigationProps) {
  return (
    <Col>
      <Row xs={1} lg={3} className="gy-4 justify-content-center">
        {options.map((option) => (
          <DashboardLink
            key={option.path}
            path={option.path}
            title={option.name}
            styleClass="btn-outline-secondary"
          />
        ))}
      </Row>
    </Col>
  );
}
