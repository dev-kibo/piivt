import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CustomAlert from "../../Alert/CustomAlert";
import { useParams } from "react-router-dom";
import IParams from "../../Common/IParams";
import RepertoireService from "../../../services/RepertoireService";
import RepertoireModel from "../../../../../03-back-end/src/components/repertoire/model";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";
import CinemaModel from "../../../../../03-back-end/src/components/cinema/model";
import MovieService from "../../../services/MovieService";
import CinemaService from "../../../services/CinemaService";
import { v4 as uuidv4 } from "uuid";
import IAddProjection from "./IAddProjection";
import RepertoireProjectionItem from "./RepertoireProjectionItem";

export default function RepertoireEditPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [repertoire, setRepertoire] = useState<RepertoireModel>();
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [cinemas, setCinemas] = useState<CinemaModel[]>([]);
  const [date, setDate] = useState<string>("");
  const [startsAt, setStartsAt] = useState<string>("");
  const [cinema, setCinema] = useState<number>();
  const [movie, setMovie] = useState<number>();
  const [projections, setProjections] = useState<IAddProjection[]>([]);
  const [isStartsAtValid, setIsStartsAtValid] = useState<boolean | undefined>(
    undefined
  );

  const [isAddProjectionButtonDisabled, setIsAddProjectionButtonDisabled] =
    useState<boolean>(true);
  const [isAddRepertoireButtonDisabled, setIsAddRepertoireButtonDisabled] =
    useState<boolean>(true);

  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );

  const { id } = useParams<IParams>();

  useEffect(() => {
    async function fetch() {
      try {
        const movies: MovieModel[] = await MovieService.getAll();
        const cinemas: CinemaModel[] = await CinemaService.getAllCinemas();

        const repertoire: RepertoireModel = await RepertoireService.getById(
          +id
        );

        const startDate: Date = new Date(repertoire.projections![0].startsAt);

        setStartsAt(`${startDate.getHours()}:${startDate.getMinutes()}`);
        setProjections(
          repertoire.projections!.map((x) => ({
            cinemaId: x.cinemaId,
            movieId: x.movieId,
            uid: x.projectionId.toString(),
          }))
        );
        setRepertoire(repertoire);
        setDate(repertoire.date);
        setMovies(movies);
        setCinemas(cinemas);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();

    return () => setIsLoading(true);
  }, [id]);

  const isFormValid = useCallback((): boolean => {
    return (
      date.length > 0 &&
      startsAt.length > 0 &&
      cinema !== undefined &&
      cinema !== -1 &&
      movie !== undefined &&
      movie !== -1
    );
  }, [date.length, startsAt.length, cinema, movie]);

  const isSubmitValid = useCallback((): boolean => {
    return date.length > 0 && startsAt.length > 0 && projections.length > 0;
  }, [date.length, startsAt.length, projections.length]);

  useEffect(() => {
    if (isFormValid()) {
      setIsAddProjectionButtonDisabled(false);
    } else {
      setIsAddProjectionButtonDisabled(true);
    }
  }, [isFormValid]);

  useEffect(() => {
    if (isSubmitValid()) {
      setIsAddRepertoireButtonDisabled(false);
    } else {
      setIsAddRepertoireButtonDisabled(true);
    }
  }, [isSubmitValid]);

  const handleStartsAt = (value: string) => {
    setStartsAt(value);

    if (value.length > 0) {
      if (!/^(([0-1][0-9])|(2[0-3])):(([0-5][0-9]))$/.test(value)) {
        setIsStartsAtValid(false);
      } else {
        setIsStartsAtValid(true);
      }
    } else {
      setIsStartsAtValid(undefined);
    }
  };

  const handleMovieSearch = async (value: string) => {
    if (value.length > 0) {
      try {
        setMovies(await MovieService.getBySearchTerm(value));
      } catch (error) {
        console.log(error);
      }
    } else {
      setMovies(await MovieService.getAll());
    }
  };

  const handleProjectionRemoveItem = (uid: string) => {
    setProjections(projections.filter((x) => x.uid !== uid));
  };

  const handleAddProjection = () => {
    setProjections([
      ...projections,
      {
        cinemaId: cinema!,
        movieId: movie!,
        uid: uuidv4(),
      },
    ]);
    setCinema(-1);
    setMovie(-1);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isSubmitValid()) {
      try {
        const timeParts: string[] = startsAt.split(":");
        const hours: number = Number.parseInt(timeParts[0]);
        const minutes: number = Number.parseInt(timeParts[1]);
        const startDate: Date = new Date(date);
        const startingAt: string = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          hours,
          minutes
        ).toISOString();

        await RepertoireService.addOrUpdate(repertoire!.repertoireId, {
          startsAt: startingAt,
          projections,
        });

        setMessage("Repertoire updated successfully.");
        setAlertVariant("success");
        setIsAlertShown(true);

        setDate("");
        setStartsAt("");
        setCinema(-1);
        setMovie(-1);
        setProjections([]);
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

  if (isLoading) {
    return <h4>Loading....</h4>;
  }
  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row className="justify-content-center">
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">
                  Edit repertoire for{" "}
                  {new Date(repertoire!.date).toLocaleDateString("sr-RS", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
              <Col>
                <Row className="justify-content-center">
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
                      <Row xs={1} md={2}>
                        <Col>
                          <Form.Group className="pb-3">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group as={Row} className="pb-3">
                            <Form.Label column xs={8} md={7} lg={8}>
                              Projection start:
                            </Form.Label>
                            <Col xs={4} md={5} lg={4}>
                              <Form.Control
                                type="text"
                                placeholder="21:00"
                                value={startsAt}
                                onChange={(e) => handleStartsAt(e.target.value)}
                              />
                            </Col>
                            <Form.Text
                              className={`${
                                isStartsAtValid === undefined || isStartsAtValid
                                  ? "d-none"
                                  : "d-block"
                              } text-danger`}
                            >
                              Invalid time format.
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Cinema:</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(e) => setCinema(+e.target.value)}
                              value={cinema}
                            >
                              <option value="-1">Choose cinema</option>
                              {cinemas.map((x) => (
                                <option key={x.cinemaId} value={x.cinemaId}>
                                  {x.name}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Search movie:</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) =>
                                handleMovieSearch(e.target.value)
                              }
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              as="select"
                              onChange={(e) => setMovie(+e.target.value)}
                              value={movie}
                            >
                              <option value="-1">Choose movie</option>
                              {movies.map((x) => (
                                <option key={x.movieId} value={x.movieId}>
                                  {x.title} - (
                                  {new Date(x.releasedAt).getFullYear()})
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Button
                            variant="outline-primary"
                            className="w-100 mt-3"
                            type="button"
                            disabled={isAddProjectionButtonDisabled}
                            onClick={handleAddProjection}
                          >
                            Add projection
                          </Button>
                        </Col>
                        <Col>
                          <div>
                            <p className="m-0">Projections:</p>
                          </div>
                          <div className="mt-3">
                            {projections.map((x) => {
                              const cinemaName: string = cinemas?.find(
                                (c) => c.cinemaId === x.cinemaId
                              )!.name;

                              const movieName: string = movies?.find(
                                (m) => m.movieId === x.movieId
                              )!.title;

                              return (
                                <RepertoireProjectionItem
                                  key={x.uid}
                                  uid={x.uid}
                                  movieName={movieName}
                                  cinemaName={cinemaName}
                                  onRemove={handleProjectionRemoveItem}
                                />
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                      <Row
                        xs={1}
                        md={3}
                        lg={4}
                        className="justify-content-end mt-5"
                      >
                        <Col>
                          <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            size="lg"
                            disabled={isAddRepertoireButtonDisabled}
                          >
                            Apply changes
                          </Button>
                        </Col>
                      </Row>
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
