import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import ProjectionModel from "../../../../../03-back-end/src/components/projection/model";
import ProjectionService from "../../../services/ProjectionService";
import CustomAlert from "../../Alert/CustomAlert";
import IParams from "../../Common/IParams";
import IData from "./IData";
import ProjectionUtility from "./ProjectionUtility";
import CinemaService from "../../../services/CinemaService";

export default function ProjectionEditSelectedPage() {
  const [projection, setProjection] = useState<IData>();
  const [cinemas, setCinemas] = useState<CinemaModel[]>();
  const [startsAt, setStartsAt] = useState<string>("");
  const [endsAt, setEndsAt] = useState<string>("");
  const [cinema, setCinema] = useState<number>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] =
    useState<"success" | "danger">("success");

  const { id } = useParams<IParams>();

  useEffect(() => {
    async function fetch() {
      try {
        const cinemas: CinemaModel[] = await CinemaService.getAllCinemas();
        const res: ProjectionModel = await ProjectionService.getById(+id);
        const mappedData: IData = await ProjectionUtility.mapSingleData(res);

        setProjection(mappedData);
        setCinemas(cinemas);
        setStartsAt(getHoursAndMinutes(mappedData.startsAt));
        setEndsAt(getHoursAndMinutes(mappedData.endsAt));
        setCinema(mappedData.cinema.cinemaId);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // if (name.length > 0) {
    //   try {
    //     const cinema: CinemaModel = await CinemaService.editCinema(+id, {
    //       name,
    //     });
    //     setMessage("Updated cinema successfully.");
    //     setAlertVariant("success");
    //     setIsAlertShown(true);
    //     setName("");
    //     setCinema(cinema);
    //   } catch (error: any) {
    //     console.log(error);
    //     if (error?.status === 409) {
    //       setMessage(error?.message?.description);
    //       setAlertVariant("danger");
    //       setIsAlertShown(true);
    //     }
    //   }
    // }
  };

  const handleDate = (value: string) => {};

  const getHoursAndMinutes = (date: string): string => {
    return new Date(date).toLocaleTimeString("sr-RS", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row>
          <Col className="text-center">
            <p className="display-4">
              Edit <span className="fw-bolder">Edit Projection</span>
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
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
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="pb-3">
                    <Form.Label>Starts at:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="21:00"
                      value={startsAt}
                      onChange={(e) => handleDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <Form.Label>Ends at:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="21:00"
                      value={endsAt}
                      onChange={(e) => handleDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <Form.Label>Cinema:</Form.Label>
                    <Form.Control as="select" value={cinema}>
                      <option value="none">Select cinema</option>
                      {cinemas?.map((x) => (
                        <option key={x.cinemaId} value={x.cinemaId}>
                          {x.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100"
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
