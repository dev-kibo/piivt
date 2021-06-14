import React from "react";
import { Row } from "react-bootstrap";
import BaseNavigation from "../Dashboard/BaseNavigation";
import IBaseNavigationProps from "../Dashboard/IBaseNavigationProps";

export default function DashboardMovies() {
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
