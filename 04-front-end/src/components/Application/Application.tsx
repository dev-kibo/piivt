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
import BaseDashboardListPage from "../Dashboard/BaseDashboardListPage";
import DashboardCinemasDeleteSelected from "../DashboardCinemas/DashboardCinemasDeleteSelected";
import DashboardMovies from "../DashboardMovies/DashboardMovies";
import DashboardMoviesAdd from "../DashboardMovies/DashboardMoviesAdd";
import DashboardMoviesEditSelected from "../DashboardMovies/DashboardMoviesEditSelected";
import DashboardMoviesDeleteSelected from "../DashboardMovies/DashboardMoviesDeleteSelected";
import DashboardActors from "../DashboardActors/DashboardActors";
import DashboardActorsAdd from "../DashboardActors/DashboardActorsAdd";
import BaseFormPage from "../Dashboard/BaseFormPage";
import DashboardLink from "../Dashboard/DashboardLink";
import DashboardMoviesListItem from "../DashboardMovies/DashboardMoviesListItem";
import DashboardActorsEditSelected from "../DashboardActors/DashboardActorsEditSelected";
import DashboardProjectionsEditSelected from "../Projections/DashboardProjectionsEditSelected";
import DashboardRepertoire from "../DashboardRepertoire/DashboardRepertoire";

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
        <Route
          path="/dashboard/cinemas/add"
          render={() => (
            <BaseFormPage form={DashboardCinemasAdd} title="Add new cinema" />
          )}
        />
        <Route
          exact
          path="/dashboard/cinemas/edit"
          render={() => (
            <BaseDashboardListPage
              relativePath="/dashboard/cinemas/edit/3"
              title="Edit cinema"
              item={DashboardLink}
              searchLabel="Search cinemas"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/cinemas/edit/:id"
          render={() => (
            <BaseFormPage
              title="Edit cinema 1"
              form={DashboardCinemasEditSelected}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/cinemas/delete"
          render={() => (
            <BaseDashboardListPage
              relativePath="/dashboard/cinemas/delete/3"
              title="Delete cinema"
              item={DashboardLink}
              searchLabel="Search cinemas"
            />
          )}
        />
        <Route
          path="/dashboard/cinemas/delete/:id"
          component={DashboardCinemasDeleteSelected}
        />
        <Route exact path="/dashboard/movies" component={DashboardMovies} />
        <Route
          path="/dashboard/movies/add"
          render={() => (
            <BaseFormPage title="Add new movie" form={DashboardMoviesAdd} />
          )}
        />
        <Route
          exact
          path="/dashboard/movies/edit"
          render={() => (
            <BaseDashboardListPage
              title="Edit movie"
              relativePath="/dashboard/movies/edit/3"
              item={DashboardMoviesListItem}
              searchLabel="Search movies"
            />
          )}
        />
        <Route
          path="/dashboard/movies/edit/:id"
          render={() => (
            <BaseFormPage
              form={DashboardMoviesEditSelected}
              title="Edit Title (1989)"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/movies/delete"
          render={() => (
            <BaseDashboardListPage
              item={DashboardMoviesListItem}
              relativePath="/dashboard/movies/delete/3"
              searchLabel="Search movies"
              title="Delete movie"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/movies/delete/:id"
          component={DashboardMoviesDeleteSelected}
        />
        <Route exact path="/dashboard/actors" component={DashboardActors} />
        <Route
          path="/dashboard/actors/add"
          render={() => (
            <BaseFormPage form={DashboardActorsAdd} title="Add new actor" />
          )}
        />
        <Route
          exact
          path="/dashboard/actors/edit"
          render={() => (
            <BaseDashboardListPage
              item={DashboardLink}
              relativePath="/dashboard/actors/edit/3"
              searchLabel="Search actors"
              title="Edit actor"
            />
          )}
        />
        <Route
          path="/dashboard/actors/edit/:id"
          render={() => (
            <BaseFormPage
              form={DashboardActorsEditSelected}
              title="Edit John Smith"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/projections"
          render={() => (
            <BaseDashboardListPage
              item={DashboardLink}
              relativePath="/dashboard/projections/edit/3"
              searchLabel="Search projections"
              title="Projections"
            />
          )}
        />
        <Route
          path="/dashboard/projections/edit/:id"
          render={() => (
            <BaseFormPage
              form={DashboardProjectionsEditSelected}
              title="Projection of Title (1989)"
            />
          )}
        />
        <Route
          exact
          path="/dashboard/repertoires"
          component={DashboardRepertoire}
        />
      </Switch>
    </Container>
  );
}
