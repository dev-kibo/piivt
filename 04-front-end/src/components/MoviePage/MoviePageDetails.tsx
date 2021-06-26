import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import MovieModel from "../../../../03-back-end/src/components/movie/model";
import useFetchMovieRoles from "../../hooks/useFetchMovieRoles";

interface IMoviePageDetailsProps {
  movie: MovieModel;
}

export default function MoviePageDetails({ movie }: IMoviePageDetailsProps) {
  const [roles, isLoading] = useFetchMovieRoles(movie.movieId);

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Row>
      <Col>
        <Row className="mt-5">
          <Col>
            <h3>Roles:</h3>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            {roles?.map((x) => {
              return (
                <Row
                  className="border p-3 my-2 align-items-center"
                  xs={3}
                  key={x.roleId}
                >
                  <Col className="text-left">
                    <p className="m-0">
                      {x.actor.firstName} {x.actor.middleName ?? ""}{" "}
                      {x.actor.lastName}
                    </p>
                  </Col>
                  <Col className="text-center">
                    <p className="m-0">...</p>
                  </Col>
                  <Col className="text-left">
                    <p className="m-0">{x.role}</p>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
