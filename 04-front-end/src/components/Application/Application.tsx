import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import "./Application.sass";
import HomePage from "../HomePage/HomePage";
import MoviePage from "../MoviePage/MoviePage";
import MoviePageProjections from "../MoviePage/MoviePageProjections";
import MoviePageDetails from "../MoviePage/MoviePageDetails";
import SignInPage from "../SignInPage/SignInPage";
import Dashboard from "../Dashboard/Dashboard";
import DashboardCinemas from "../DashboardCinemas/DashboardCinemas";
import DashboardCinemasAdd from "../DashboardCinemas/DashboardCinemasAdd";
import DashboardCinemasEditSelected from "../DashboardCinemas/DashboardCinemasEditSelected";
import BaseCinemasList from "../DashboardCinemas/BaseCinemasList";
import DashboardCinemasDeleteSelected from "../DashboardCinemas/DashboardCinemasDeleteSelected";

export default function Application() {
  return (
    <Container className="Application p-4 vh-100 min-vh-100">
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
        <Route path="/admin" component={SignInPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/cinemas" component={DashboardCinemas} />
        <Route path="/dashboard/cinemas/add" component={DashboardCinemasAdd} />
        <Route
          exact
          path="/dashboard/cinemas/edit"
          render={() => (
            <BaseCinemasList
              relativePath="/dashboard/cinemas/edit/3"
              title="Edit cinema"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/cinemas/edit/:id"
          component={DashboardCinemasEditSelected}
        />
        <Route
          exact
          path="/dashboard/cinemas/delete"
          render={() => (
            <BaseCinemasList
              relativePath="/dashboard/cinemas/delete/3"
              title="Delete cinema"
            />
          )}
        />
        <Route
          path="/dashboard/cinemas/delete/:id"
          component={DashboardCinemasDeleteSelected}
        />
      </Switch>
    </Container>
  );
}
