import React from "react";
import IBaseNavigationProps from "../IBaseNavigationProps";
import BaseNavigation from "../BaseNavigation";
import { Row } from "react-bootstrap";
import { withAuth } from "../../Hocs/withAuth";

function RepertoirePage() {
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

export default withAuth(RepertoirePage);
