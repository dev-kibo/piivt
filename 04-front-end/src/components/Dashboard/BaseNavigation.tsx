import React from "react";
import { Col, Row } from "react-bootstrap";
import DashboardLink from "./DashboardLink";
import IBaseNavigationProps from "./IBaseNavigationProps";

export default function BaseNavigation({ options }: IBaseNavigationProps) {
  const getJustify = (optionsLength: number): string => {
    if (optionsLength <= 3) {
      return "justify-content-xl-center";
    } else {
      return "justify-content-start";
    }
  };

  return (
    <Col>
      <Row
        xs={1}
        md={2}
        xl={options.length < 4 ? 3 : 4}
        className={`gy-4 ${getJustify(options.length)}`}
      >
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
