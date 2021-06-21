import React, { useEffect, useState } from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import CinemaService from "../../../services/CinemaService";
import IParams from "../../Common/IParams";

export default function CinemaDeleteSelectedPage() {
  const [cinema, setCinema] = useState<CinemaModel>();
  const [status, setStatus] = useState<"success" | "failed" | "">("");
  const { id } = useParams<IParams>();
  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      try {
        const cinema: CinemaModel = await CinemaService.getCinemaById(+id);
        setCinema(cinema);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);

  const handleYes = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const status: number = await CinemaService.deleteCinema(+id);

      console.log(status);

      if (status === 204) {
        setStatus("success");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  const goBack = (e: React.SyntheticEvent) => {
    e.preventDefault();

    history.goBack();
  };

  return (
    <Row className="align-items-center h-100">
      <Col className="d-flex flex-column align-items-center">
        <Row className="text-center">
          <Col>
            <p className="display-5">
              You want to delete{" "}
              <span className="fw-bolder">{cinema?.name}</span>.
            </p>
            <p className="display-4">Are you sure?</p>
          </Col>
        </Row>
        <Row className={`mt-5 ${status === "success" ? "d-block" : "d-none"}`}>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Deleted successfully.</Alert.Heading>
              <Button
                variant="link"
                className="alert-link"
                onClick={(e) => goBack(e)}
              >
                Click here to go back.
              </Button>
            </Alert>
          </Col>
        </Row>
        <Row className={`mt-5 ${status === "failed" ? "d-block" : "d-none"}`}>
          <Col>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Something went wrong.</Alert.Heading>
              <Button
                variant="link"
                className="alert-link"
                onClick={(e) => goBack(e)}
              >
                Click here to go back.
              </Button>
            </Alert>
          </Col>
        </Row>
        <Row
          className={`w-100 justify-content-center mt-5 ${
            status !== "" ? "d-none" : "d-flex"
          }`}
          xs={1}
          md={4}
        >
          <Col>
            <Button
              onClick={(e) => handleYes(e)}
              variant="danger"
              type="button"
              size="lg"
              className="w-100"
            >
              Yes
            </Button>
          </Col>
          <Col className="mt-3 mt-md-0">
            <Button
              variant="outline-secondary"
              type="button"
              size="lg"
              className="w-100"
              onClick={(e) => goBack(e)}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
