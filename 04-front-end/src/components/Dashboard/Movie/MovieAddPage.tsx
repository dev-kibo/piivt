import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ActorModel from "../../../../../03-back-end/src/components/actor/model";
import ActorService from "../../../services/ActorService";
import CustomAlert from "../../Alert/CustomAlert";
import MovieService from "../../../services/MovieService";
import MovieModel from "../../../../../03-back-end/src/components/movie/model";
import MovieRoleItem from "./MovieRoleItem";
import { v4 as uuidv4 } from "uuid";

interface IRole {
  actorId: number;
  movieId?: number;
  role: string;
  uid: string;
}

export default function MovieAddPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [duration, setDuration] = useState<number>();
  const [poster, setPoster] = useState<Blob>();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [role, setRole] = useState<string>("");
  const [actors, setActors] = useState<ActorModel[]>();
  const [actor, setActor] = useState<number>();

  const [isAddRoleButtonDisabled, setIsAddRoleButtonDisabled] =
    useState<boolean>(true);
  const [isAddMovieButtonDisabled, setIsAddMovieButtonDisabled] =
    useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">(
    "success"
  );
  const [isReleasedAtValid, setIsReleasedAtValid] = useState<
    boolean | undefined
  >(undefined);

  const isFormValid = useCallback((): boolean => {
    return (
      title.length > 1 &&
      description.length > 1 &&
      isDateValid(releaseDate) &&
      Number.isInteger(duration) &&
      roles.length > 0
    );
  }, [description.length, title.length, releaseDate, duration, roles.length]);

  useEffect(() => {
    async function fetch() {}
    fetch();
  }, []);

  useEffect(() => {
    if (actor !== undefined && actor !== -1 && role.length > 0) {
      setIsAddRoleButtonDisabled(false);
    } else {
      setIsAddRoleButtonDisabled(true);
    }
  }, [actor, role]);

  useEffect(() => {
    if (isFormValid() && poster !== undefined && duration !== undefined) {
      setIsAddMovieButtonDisabled(false);
    } else {
      setIsAddMovieButtonDisabled(true);
    }
  }, [poster, duration, isFormValid]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (isFormValid() && duration !== undefined && poster !== undefined) {
      try {
        const movie: MovieModel = await MovieService.add({
          title,
          description,
          releaseDate,
          duration,
          poster,
        });

        const response = await MovieService.addRolesToMovie(
          roles.map((x) => ({
            actorId: x.actorId,
            movieId: movie.movieId,
            role: x.role,
          }))
        );

        if (response.length === roles.length) {
          setMessage("Movie added successfully.");
          setAlertVariant("success");
          setIsAlertShown(true);

          setTitle("");
          setDescription("");
          setReleaseDate("");
          setDuration(+"");
          setPoster(undefined);
          setRoles([]);
          setRole("");
          setActor(+"");
        }
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

  const handleReleaseDate = (value: string) => {
    if (value.length < 11) {
      setReleaseDate(value);

      if (!isDateValid(value)) {
        setIsReleasedAtValid(false);
      } else {
        setIsReleasedAtValid(true);
      }
    }
    if (value.length === 0) {
      setIsReleasedAtValid(undefined);
    }
  };

  const isDateValid = (date: string): boolean => {
    return /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(date);
  };

  const handleAddRole = () => {
    setRoles([
      ...roles,
      {
        actorId: actor!,
        role: role,
        uid: uuidv4(),
      },
    ]);
    setRole("");
  };

  const handleRoleItemRemove = (uid: string) => {
    setRoles(roles.filter((x) => x.uid !== uid));
  };

  const handleSearch = async (value: string) => {
    if (value.length > 0) {
      try {
        setActors(await ActorService.search(value));
      } catch (error) {
        console.log(error);
      }
    } else {
      setActors(await await ActorService.getAll());
    }
  };

  return (
    <Row className="justify-content-center h-100 align-items-center">
      <Col>
        <Row className="justify-content-center">
          <Col>
            <Row>
              <Col className="text-center">
                <p className="display-4">Add new movie</p>
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
                      <Row xs={1} lg={3}>
                        <Col>
                          <Form.Group className="pb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                            />
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                              as="textarea"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                            />
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Release date:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="1984-02-28"
                              value={releaseDate}
                              onChange={(e) =>
                                handleReleaseDate(e.target.value)
                              }
                            />
                            <Form.Text
                              className={`${
                                isReleasedAtValid === undefined ||
                                isReleasedAtValid
                                  ? "d-none"
                                  : "d-block"
                              } text-danger`}
                            >
                              Invalid date format.
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Duration (minutes):</Form.Label>
                            <Form.Control
                              type="number"
                              min={1}
                              step={1}
                              placeholder="89"
                              onChange={(e) => setDuration(+e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Poster:</Form.Label>
                            <Form.Control
                              type="file"
                              onChange={(e: any) =>
                                setPoster(e.target.files[0])
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="pb-3">
                            <Form.Label>Search actors:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="John Smith"
                              onChange={(e) => handleSearch(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Actors:</Form.Label>
                            <Form.Control
                              as="select"
                              onChange={(e) => setActor(+e.target.value)}
                            >
                              <option value="-1">Choose...</option>
                              {actors?.map((x) => (
                                <option key={x.actorId} value={x.actorId}>
                                  {x.firstName} {x.middleName} {x.lastName}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="pb-3">
                            <Form.Label>Role:</Form.Label>
                            <Form.Control
                              type="text"
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            />
                          </Form.Group>
                          <Button
                            type="button"
                            variant="outline-primary w-100 mt-3"
                            onClick={handleAddRole}
                            disabled={isAddRoleButtonDisabled}
                          >
                            Add role
                          </Button>
                        </Col>
                        <Col className="mt-3 mt-md-0">
                          <div>
                            <p className="m-0">Roles:</p>
                          </div>
                          <div className="mt-3">
                            {roles.map((x) => {
                              const actor = actors?.find(
                                (a) => a.actorId === x.actorId
                              );

                              return (
                                <MovieRoleItem
                                  key={x.uid}
                                  uid={x.uid}
                                  actor={actor!}
                                  role={x.role}
                                  onRemove={handleRoleItemRemove}
                                />
                              );
                            })}
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col xs={12} lg={4} className="mt-5">
                          <Button
                            variant="primary"
                            size="lg"
                            type="submit"
                            className="w-100"
                            disabled={isAddMovieButtonDisabled}
                          >
                            Add movie
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
