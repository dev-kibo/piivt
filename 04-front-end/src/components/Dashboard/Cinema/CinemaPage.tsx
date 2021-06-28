import React from "react";
import { Row } from "react-bootstrap";
import BaseNavigation from "../BaseNavigation";
import IBaseNavigationProps from "../IBaseNavigationProps";
import { withAuth } from "../../Hocs/withAuth";

function CinemaPage() {
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

export default withAuth(CinemaPage);
