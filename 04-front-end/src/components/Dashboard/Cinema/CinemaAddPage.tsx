import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import CinemaService from "../../../services/CinemaService";
import CustomAlert from "../../Alert/CustomAlert";

export default function CinemaAddPage() {
  const [name, setName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (name.length > 0) {
      try {
        await CinemaService.addCinema({ name });
        setMessage("Created new cinema successfully.");
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
        <Row className="justify-content-center">
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">Add new cinema</p>
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
                        <Form.Label>Cinema name:</Form.Label>
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
                        Add
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
