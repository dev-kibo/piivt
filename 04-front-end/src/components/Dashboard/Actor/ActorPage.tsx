import React from "react";
import BaseNavigation from "../BaseNavigation";
import { Row } from "react-bootstrap";
import IBaseNavigationProps from "../IBaseNavigationProps";
import { withAuth } from "../../Hocs/withAuth";

function ActorPage() {
  const props: IBaseNavigationProps = {
    options: [
      {
        name: "Add actor",
        path: "/dashboard/actors/add",
      },
      {
        name: "Edit actor",
        path: "/dashboard/actors/edit",
      },
    ],
  };

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <BaseNavigation options={props.options} />
    </Row>
  );
}

export default withAuth(ActorPage);
