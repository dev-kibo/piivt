import React from "react";
import { Row } from "react-bootstrap";
import { withAuth } from "../../Hocs/withAuth";
import BaseNavigation from "../BaseNavigation";
import IBaseNavigationProps from "../IBaseNavigationProps";

function DashboardMoviePage() {
  const props: IBaseNavigationProps = {
    options: [
      {
        name: "Add movie",
        path: "/dashboard/movies/add",
      },
      {
        name: "Edit Movie",
        path: "/dashboard/movies/edit",
      },
      {
        name: "Delete movie",
        path: "/dashboard/movies/delete",
      },
    ],
  };

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <BaseNavigation options={props.options} />
    </Row>
  );
}

export default withAuth(DashboardMoviePage);
