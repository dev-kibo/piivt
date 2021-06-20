import React from "react";
import { Row } from "react-bootstrap";
import BaseNavigation from "./BaseNavigation";
import IBaseNavigationProps from "./IBaseNavigationProps";

export default function DashboardPage() {
  const props: IBaseNavigationProps = {
    options: [
      {
        name: "Cinemas",
        path: "/dashboard/cinemas",
      },
      {
        name: "Movies",
        path: "/dashboard/movies",
      },
      {
        name: "Actors",
        path: "/dashboard/actors",
      },
      {
        name: "Projections",
        path: "/dashboard/projections",
      },
      {
        name: "Repertoire",
        path: "/dashboard/repertoires",
      },
    ],
  };

  return (
    <Row className="h-100 align-items-center">
      <BaseNavigation options={props.options} />
    </Row>
  );
}