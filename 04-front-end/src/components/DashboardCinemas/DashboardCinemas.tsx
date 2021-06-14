import React from "react";
import { Row } from "react-bootstrap";
import BaseNavigation from "../Dashboard/BaseNavigation";
import IBaseNavigationProps from "../Dashboard/IBaseNavigationProps";

export default function DashboardCinemas() {
  const props: IBaseNavigationProps = {
    options: [
      {
        name: "Add cinema",
        path: "/dashboard/cinemas/add",
      },
      {
        name: "Edit cinema",
        path: "/dashboard/cinemas/edit",
      },
      {
        name: "Delete cinema",
        path: "/dashboard/cinemas/delete",
      },
    ],
  };

  return (
    <Row className="h-100 align-items-center">
      <BaseNavigation options={props.options} />
    </Row>
  );
}
