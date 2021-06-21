import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import "./Application.sass";
import HomePage from "../HomePage/HomePage";
import MoviePageProjections from "../MoviePage/MoviePageProjections";
import MoviePageDetails from "../MoviePage/MoviePageDetails";
import SignInPage from "../SignInPage/SignInPage";
import DashboardPage from "../Dashboard/DashboardPage";
import CinemaPage from "../Dashboard/Cinema/CinemaPage";
import CinemaAddPage from "../Dashboard/Cinema/CinemaAddPage";
import CinemaEditSelectedPage from "../Dashboard/Cinema/CinemaEditSelectedPage";
import BaseDashboardListPage from "../Dashboard/BaseDashboardListPage";
import DashboardCinemasDeleteSelected from "../Dashboard/Cinema/CinemaDeleteSelectedPage";
import MovieOperationsPage from "../Dashboard/Movie/MovieOperationsPage";
import MovieAddPage from "../Dashboard/Movie/MovieAddPage";
import MovieEditSelectedPage from "../Dashboard/Movie/MovieEditSelectedPage";
import MovieDeleteSelectedPage from "../Dashboard/Movie/MovieDeleteSelectedPage";
import ActorPage from "../Dashboard/Actor/ActorPage";
import ActorAddPage from "../Dashboard/Actor/ActorAddPage";
import BaseFormPage from "../Dashboard/BaseFormPage";
import DashboardLink from "../Dashboard/DashboardLink";
import MovieListItem from "../Dashboard/Movie/MovieListItem";
import ActorEditSelectedPage from "../Dashboard/Actor/ActorEditSelectedPage";
import ProjectionEditSelectedPage from "../Dashboard/Projection/ProjectionEditSelectedPage";
import RepertoirePage from "../Dashboard/Repertoire/RepertoirePage";
import RepertoireAddPage from "../Dashboard/Repertoire/RepertoireAddPage";
import RepertoireEditPage from "../Dashboard/Repertoire/RepertoireEditPage";
import MoviePage from "../MoviePage/MoviePage";
import Navigation from "../Navigation/Navigation";
import CinemaSearch from "../Dashboard/Cinema/CinemaSearch";
import ActorSearch from "../Dashboard/Actor/ActorSearch";
import ProjectionSearchPage from "../Dashboard/Projection/ProjectionSearchPage";

export default function Application() {
  return (
    <>
      {/* <Navigation /> */}
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
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/dashboard/cinemas" component={CinemaPage} />
          <Route path="/dashboard/cinemas/add" component={CinemaAddPage} />
          <Route
            exact
            path="/dashboard/cinemas/edit"
            render={() => (
              <CinemaSearch
                relativePath="/dashboard/cinemas/edit"
                title="Edit cinema"
                item={DashboardLink}
                searchLabel="Search cinemas"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/cinemas/edit/:id"
            component={CinemaEditSelectedPage}
          />
          <Route
            exact
            path="/dashboard/cinemas/delete"
            render={() => (
              <CinemaSearch
                relativePath="/dashboard/cinemas/delete"
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
          <Route
            exact
            path="/dashboard/movies"
            component={MovieOperationsPage}
          />
          <Route
            path="/dashboard/movies/add"
            render={() => (
              <BaseFormPage title="Add new movie" form={MovieAddPage} />
            )}
          />
          <Route
            exact
            path="/dashboard/movies/edit"
            render={() => (
              <BaseDashboardListPage
                title="Edit movie"
                relativePath="/dashboard/movies/edit/3"
                item={MovieListItem}
                searchLabel="Search movies"
                type="movie"
                action="get"
              />
            )}
          />
          <Route
            path="/dashboard/movies/edit/:id"
            render={() => (
              <BaseFormPage
                form={MovieEditSelectedPage}
                title="Edit Title (1989)"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/movies/delete"
            render={() => (
              <BaseDashboardListPage
                item={MovieListItem}
                relativePath="/dashboard/movies/delete/3"
                searchLabel="Search movies"
                title="Delete movie"
                type="movie"
                action="get"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/movies/delete/:id"
            component={MovieDeleteSelectedPage}
          />
          <Route exact path="/dashboard/actors" component={ActorPage} />
          <Route path="/dashboard/actors/add" component={ActorAddPage} />
          <Route
            exact
            path="/dashboard/actors/edit"
            render={() => (
              <ActorSearch
                item={DashboardLink}
                relativePath="/dashboard/actors/edit"
                searchLabel="Search actors"
                title="Edit actor"
              />
            )}
          />
          <Route
            path="/dashboard/actors/edit/:id"
            render={() => (
              <BaseFormPage
                form={ActorEditSelectedPage}
                title="Edit John Smith"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/projections"
            render={() => (
              <ProjectionSearchPage
                item={DashboardLink}
                relativePath="/dashboard/projections/edit"
                searchLabel="Search projections"
                title="Projections"
              />
            )}
          />
          {/* <Route
            exact
            path="/dashboard/projections"
            render={() => (
              <BaseDashboardListPage
                item={DashboardLink}
                relativePath="/dashboard/projections/edit/3"
                searchLabel="Search projections"
                title="Projections"
                action="get"
                type="projection"
              />
            )}
          /> */}
          <Route
            path="/dashboard/projections/edit/:id"
            render={() => (
              <BaseFormPage
                form={ProjectionEditSelectedPage}
                title="Projection of Title (1989)"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/repertoires"
            component={RepertoirePage}
          />
          <Route
            path="/dashboard/repertoires/add"
            render={() => (
              <BaseFormPage
                form={RepertoireAddPage}
                title="Add new repertoire"
              />
            )}
          />
          <Route
            exact
            path="/dashboard/repertoires/edit"
            render={() => (
              <BaseDashboardListPage
                item={DashboardLink}
                relativePath="/dashboard/repertoires/edit/3"
                searchLabel="Search repertoires"
                title="Edit repertoire"
                action="get"
                type="repertoire"
              />
            )}
          />
          <Route
            path="/dashboard/repertoires/edit/:id"
            render={() => (
              <BaseFormPage form={RepertoireEditPage} title="Edit repertoire" />
            )}
          />
        </Switch>
      </Container>
    </>
  );
}
