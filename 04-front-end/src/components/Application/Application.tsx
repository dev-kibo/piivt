import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import "./Application.sass";
import HomePage from "../HomePage/HomePage";
import MoviePage from "../MoviePage/MoviePage";
import MoviePageProjections from "../MoviePage/MoviePageProjections";
import MoviePageDetails from "../MoviePage/MoviePageDetails";

export default function Application() {
  return (
    <Container className="Application p-4">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/movies/:id"
          render={() => <MoviePage component={MoviePageProjections} />}
        />
        <Route
          path="/movies/:id/details"
          render={() => <MoviePage component={MoviePageDetails} />}
        />
      </Switch>
    </Container>
  );
}
