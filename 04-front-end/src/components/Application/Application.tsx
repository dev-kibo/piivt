import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import "./Application.sass";
import HomePage from "../HomePage/HomePage";
import MoviePage from "../MoviePage/MoviePage";

export default function Application() {
  return (
    <Container className="Application p-4">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/movies/:id" component={MoviePage} />
      </Switch>
    </Container>
  );
}
