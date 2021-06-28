import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import IParams from "../../Common/IParams";
import CinemaService from "../../../services/CinemaService";
import CustomAlert from "../../Alert/CustomAlert";
import useFetchCinema from "../../../hooks/useFetchCinema";
import { withAuth } from "../../Hocs/withAuth";

function CinemaEditSelectedPage() {
  const [name, setName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );

  const { id } = useParams<IParams>();
  const [cinema] = useFetchCinema(+id);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (name.length > 0) {
      try {
        await CinemaService.editCinema(+id, {
          name,
        });
        setMessage("Updated cinema successfully.");
        setAlertVariant("success");
        setIsAlertShown(true);
        setName("");
      } catch (error: any) {
        console.log(error);
        if (error?.status === 409) {
          setMessage(error?.message?.description);
          setAlertVariant("danger");
          setIsAlertShown(true);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsDisabled(false);

    if (e.target.value.length < 1) {
      setIsDisabled(true);
      setName("");
    }
  };

  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row>
          <Col className="text-center">
            <p className="display-4">
              Edit <span className="fw-bolder">{cinema?.name}</span>
            </p>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Col>
            <Row xs={1} md={2} lg={3} className="justify-content-center">
              <Col>
                {isAlertShown ? (
                  <CustomAlert
                    message={message}
                    setIsAlertShown={setIsAlertShown}
                    variant={alertVariant}
                  />
                ) : (
                  ""
                )}
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group>
                    <Form.Label>New cinema name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      size="lg"
                      onChange={handleChange}
                      value={name}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    disabled={isDisabled}
                  >
                    Apply changes
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default withAuth(CinemaEditSelectedPage);
