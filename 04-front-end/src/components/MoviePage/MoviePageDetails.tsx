import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieModel from "../../../../03-back-end/src/components/movie/model";
import RoleModel from "../../../../03-back-end/src/components/role/model";
import MovieService from "../../services/MovieService";

interface IMoviePageDetailsProps {
  movie: MovieModel;
}

export default function MoviePageDetails({ movie }: IMoviePageDetailsProps) {
  const [roles, setRoles] = useState<RoleModel[] | undefined>([]);

  useEffect(() => {
    async function fetch() {
      const response = await MovieService.getRolesForMovie(movie.movieId);
      console.log(response);
      setRoles(response.roles);
    }
    fetch();
  }, [movie.movieId]);

  return (
    <Row>
      <Col>
        <Row>
          <Col className="border p-3">
            <p>{movie.description}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Roles</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            {roles?.map((x) => {
              return (
                <Row className="border p-3 my-2" xs={3} key={x.roleId}>
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
