import React from "react";
import IBaseNavigationProps from "../IBaseNavigationProps";
import BaseNavigation from "../BaseNavigation";
import { Row } from "react-bootstrap";

export default function RepertoirePage() {
  const props: IBaseNavigationProps = {
    options: [
      {
        name: "Add repertoire",
        path: "/dashboard/repertoires/add",
      },
      {
        name: "Edit repertoire",
        path: "/dashboard/repertoires/edit",
      },
    ],
  };

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <BaseNavigation options={props.options} />
    </Row>
  );
}
