import React from "react";
import { Row, Col } from "react-bootstrap";
import IBaseFormPageProps from "./IBaseFormPageProps";

export default function BaseFormPage({
  title,
  form: FormComponent,
}: IBaseFormPageProps) {
  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        {/* xs={1} md={2} xl={3} */}
        <Row className="justify-content-center">
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">{title}</p>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <FormComponent />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
