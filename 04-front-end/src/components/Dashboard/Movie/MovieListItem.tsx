import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import BaseLink from "../BaseLink";

interface IMovieListItemProps {
  path: string;
  title: string;
  styleClass: "btn-outline-secondary" | "btn-outline-primary";
  imagePath?: string;
}

export default class MovieListItem extends BaseLink<IMovieListItemProps> {
  render() {
    return (
      <Col className="">
        <Link
          className="btn btn-outline-primary h-100 w-100"
          to={this.props.path}
        >
          <Row className="h-100">
            <Col className="align-self-center">
              <Image
                src={`${this.props.imagePath?.slice(
                  0,
                  this.props.imagePath.length - 4
                )}-small.jpg`}
              />
            </Col>
            <Col>
              <h3>{this.props.title}</h3>
            </Col>
          </Row>
        </Link>
      </Col>
    );
  }
}
