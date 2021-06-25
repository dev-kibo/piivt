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
import DashboardCinemasDeleteSelected from "../Dashboard/Cinema/CinemaDeleteSelectedPage";
import DashboardMoviePage from "../Dashboard/Movie/DashboardMoviePage";
import MovieAddPage from "../Dashboard/Movie/MovieAddPage";
import MovieEditSelectedPage from "../Dashboard/Movie/MovieEditSelectedPage";
import MovieDeleteSelectedPage from "../Dashboard/Movie/MovieDeleteSelectedPage";
import ActorPage from "../Dashboard/Actor/ActorPage";
import ActorAddPage from "../Dashboard/Actor/ActorAddPage";
import BaseFormPage from "../Dashboard/BaseFormPage";
import DashboardLink from "../Dashboard/DashboardLink";
import MovieListItem from "../Dashboard/Movie/MovieListItem";
import ActorEditSelectedPage from "../Dashboard/Actor/ActorEditSelectedPage";
import RepertoirePage from "../Dashboard/Repertoire/RepertoirePage";
import RepertoireAddPage from "../Dashboard/Repertoire/RepertoireAddPage";
import RepertoireEditPage from "../Dashboard/Repertoire/RepertoireEditPage";
import MoviePage from "../MoviePage/MoviePage";
import Navigation from "../Navigation/Navigation";
import CinemaSearchPage from "../Dashboard/Cinema/CinemaSearchPage";
import ActorSearch from "../Dashboard/Actor/ActorSearch";
import MovieSearchPage from "../Dashboard/Movie/MovieSearchPage";
import RepertoireSearchPage from "../Dashboard/Repertoire/RepertoireSearchPage";

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
              <CinemaSearchPage
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
              <CinemaSearchPage
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
            component={DashboardMoviePage}
          />
          <Route path="/dashboard/movies/add" component={MovieAddPage} />
          <Route
            exact
            path="/dashboard/movies/edit"
            render={() => (
              <MovieSearchPage
                relativePath="/dashboard/movies/edit"
                title="Edit movie"
                item={MovieListItem}
                searchLabel="Search movies"
              />
            )}
          />
          <Route
            path="/dashboard/movies/edit/:id"
            component={MovieEditSelectedPage}
          />
          <Route
            exact
            path="/dashboard/movies/delete"
            render={() => (
              <MovieSearchPage
                item={MovieListItem}
                relativePath="/dashboard/movies/delete"
                searchLabel="Search movies"
                title="Delete movie"
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
            path="/dashboard/repertoires"
            component={RepertoirePage}
          />
          <Route
            path="/dashboard/repertoires/add"
            component={RepertoireAddPage}
          />
          <Route
            exact
            path="/dashboard/repertoires/edit"
            render={() => (
              <RepertoireSearchPage
                item={DashboardLink}
                relativePath="/dashboard/repertoires/edit"
                title="Edit repertoire"
              />
            )}
          />
          <Route
            path="/dashboard/repertoires/edit/:id"
            component={RepertoireEditPage}
          />
        </Switch>
      </Container>
    </>
  );
}
