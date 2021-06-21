import React from "react";
import { Row, Col } from "react-bootstrap";
import IBaseFormPageProps from "./IBaseFormPageProps";

export default function BaseFormPage({
  form: FormComponent,
}: IBaseFormPageProps) {
  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        {/* xs={1} md={2} xl={3} */}
        <FormComponent />
      </Col>
    </Row>
  );
}
