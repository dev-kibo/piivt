import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BaseLink from "./BaseLink";

interface DashboardLinkProps {
  path: string;
  styleClass: "btn-outline-secondary" | "btn-outline-primary";
  title: string;
}

export default class DashboardLink extends BaseLink<DashboardLinkProps> {
  render() {
    return (
      <Col>
        <Link
          to={this.props.path}
          className={`btn ${this.props.styleClass} w-100 p-4`}
        >
          <p className="m-0 display-5">{this.props.title}</p>
        </Link>
      </Col>
    );
  }
}

// export default function DashboardLink({
//   path,
//   styleClass,
//   linkTitle,
// }: DashboardLinkProps) {
//   return (
//     <Col>
//       <Link to={path} className={`btn ${styleClass} w-100 p-4`}>
//         <p className="m-0 display-5">{linkTitle}</p>
//       </Link>
//     </Col>
//   );
// }
