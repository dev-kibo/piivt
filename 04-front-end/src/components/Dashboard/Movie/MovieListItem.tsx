import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import poster from "../../../assets/poster.jpg";
import BaseLink from "../BaseLink";

interface IMovieListItemProps {
  path: string;
  title: string;
  styleClass: "btn-outline-secondary" | "btn-outline-primary";
}

export default class MovieListItem extends BaseLink<IMovieListItemProps> {
  render() {
    return (
      <Col className="w-auto">
        <Link className="btn btn-outline-primary" to={this.props.path}>
          <Row>
            <Col>
              <Image src={poster} fluid />
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