import React from "react";
import { Row } from "react-bootstrap";
import BaseNavigation from "./BaseNavigation";
import IBaseNavigationProps from "./IBaseNavigationProps";
import { withAuth } from "../Hocs/withAuth";

function DashboardPage() {
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

export default withAuth(DashboardPage);
