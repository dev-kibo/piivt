import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ActorService from "../../../services/ActorService";
import CustomAlert from "../../Alert/CustomAlert";
import IParams from "../../Common/IParams";
import useFetchActor from "../../../hooks/useFetchActor";

export default function ActorEditSelectedPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );

  const { id } = useParams<IParams>();
  const [actor] = useFetchActor(+id);

  useEffect(() => {
    if (firstName.length > 0 && lastName.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (firstName.length > 1 && lastName.length > 1) {
      try {
        await ActorService.editActor(+id, {
          firstName,
          lastName,
          middleName,
        });
        setMessage("Updated actor successfully.");
        setAlertVariant("success");
        setIsAlertShown(true);
        setFirstName("");
        setMiddleName("");
        setLastName("");
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

  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row xs={1} md={2} lg={3} className="justify-content-center">
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">
                  Edit {actor?.firstName}{" "}
                  {actor?.middleName ? actor.middleName.slice(0, 1) + "." : ""}{" "}
                  {actor?.lastName}
                </p>
              </Col>
            </Row>
            <Row className="mt-5">
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
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="pb-3">
                    <Form.Label>First name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      size="lg"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <Form.Label>Middle name (optional):</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter middle name"
                      size="lg"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      size="lg"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
