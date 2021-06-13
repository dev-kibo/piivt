import React from "react";
import { Row } from "react-bootstrap";
import BaseOptions from "../Dashboard/BaseOptions";
import IBaseOptionsProps from "../Dashboard/IBaseOptionsProps";

export default function DashboardMovies() {
  const props: IBaseOptionsProps = {
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
      <BaseOptions options={props.options} />
    </Row>
  );
}
