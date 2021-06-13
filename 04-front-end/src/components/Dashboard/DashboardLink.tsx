import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface DashboardLinkProps {
  path: string;
  styleClass: "btn-outline-secondary" | "btn-outline-primary";
  linkTitle: string;
}

export default function DashboardLink({
  path,
  styleClass,
  linkTitle,
}: DashboardLinkProps) {
  return (
    <Col>
      <Link to={path} className={`btn ${styleClass} w-100 p-4`}>
        <p className="m-0 display-5">{linkTitle}</p>
      </Link>
    </Col>
  );
}
