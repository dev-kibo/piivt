"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
require("./Application.sass");
var HomePage_1 = require("../HomePage/HomePage");
var MoviePageProjections_1 = require("../MoviePage/MoviePageProjections");
var MoviePageDetails_1 = require("../MoviePage/MoviePageDetails");
var SignInPage_1 = require("../SignInPage/SignInPage");
var DashboardPage_1 = require("../Dashboard/DashboardPage");
var CinemaPage_1 = require("../Dashboard/Cinema/CinemaPage");
var CinemaAddPage_1 = require("../Dashboard/Cinema/CinemaAddPage");
var CinemaEditSelectedPage_1 = require("../Dashboard/Cinema/CinemaEditSelectedPage");
var CinemaDeleteSelectedPage_1 = require("../Dashboard/Cinema/CinemaDeleteSelectedPage");
var DashboardMoviePage_1 = require("../Dashboard/Movie/DashboardMoviePage");
var MovieAddPage_1 = require("../Dashboard/Movie/MovieAddPage");
var MovieEditSelectedPage_1 = require("../Dashboard/Movie/MovieEditSelectedPage");
var MovieDeleteSelectedPage_1 = require("../Dashboard/Movie/MovieDeleteSelectedPage");
var ActorPage_1 = require("../Dashboard/Actor/ActorPage");
var ActorAddPage_1 = require("../Dashboard/Actor/ActorAddPage");
var BaseFormPage_1 = require("../Dashboard/BaseFormPage");
var DashboardLink_1 = require("../Dashboard/DashboardLink");
var MovieListItem_1 = require("../Dashboard/Movie/MovieListItem");
var ActorEditSelectedPage_1 = require("../Dashboard/Actor/ActorEditSelectedPage");
var RepertoirePage_1 = require("../Dashboard/Repertoire/RepertoirePage");
var RepertoireAddPage_1 = require("../Dashboard/Repertoire/RepertoireAddPage");
var RepertoireEditPage_1 = require("../Dashboard/Repertoire/RepertoireEditPage");
var MoviePage_1 = require("../MoviePage/MoviePage");
var CinemaSearchPage_1 = require("../Dashboard/Cinema/CinemaSearchPage");
var ActorSearch_1 = require("../Dashboard/Actor/ActorSearch");
var MovieSearchPage_1 = require("../Dashboard/Movie/MovieSearchPage");
var RepertoireSearchPage_1 = require("../Dashboard/Repertoire/RepertoireSearchPage");
function Application() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_bootstrap_1.Container, { className: "Application p-4 vh-100 min-vh-100" },
            react_1["default"].createElement(react_router_dom_1.Switch, null,
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomePage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/movies/:id", render: function () { return react_1["default"].createElement(MoviePage_1["default"], { component: MoviePageProjections_1["default"] }); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/movies/:id/details", render: function () { return react_1["default"].createElement(MoviePage_1["default"], { component: MoviePageDetails_1["default"] }); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/admin", component: SignInPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard", component: DashboardPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/cinemas", component: CinemaPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/cinemas/add", component: CinemaAddPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/cinemas/edit", render: function () { return (react_1["default"].createElement(CinemaSearchPage_1["default"], { relativePath: "/dashboard/cinemas/edit", title: "Edit cinema", item: DashboardLink_1["default"], searchLabel: "Search cinemas" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/cinemas/edit/:id", component: CinemaEditSelectedPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/cinemas/delete", render: function () { return (react_1["default"].createElement(CinemaSearchPage_1["default"], { relativePath: "/dashboard/cinemas/delete", title: "Delete cinema", item: DashboardLink_1["default"], searchLabel: "Search cinemas" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/cinemas/delete/:id", component: CinemaDeleteSelectedPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/movies", component: DashboardMoviePage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/movies/add", component: MovieAddPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/movies/edit", render: function () { return (react_1["default"].createElement(MovieSearchPage_1["default"], { relativePath: "/dashboard/movies/edit", title: "Edit movie", item: MovieListItem_1["default"], searchLabel: "Search movies" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/movies/edit/:id", component: MovieEditSelectedPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/movies/delete", render: function () { return (react_1["default"].createElement(MovieSearchPage_1["default"], { item: MovieListItem_1["default"], relativePath: "/dashboard/movies/delete", searchLabel: "Search movies", title: "Delete movie" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/movies/delete/:id", component: MovieDeleteSelectedPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/actors", component: ActorPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/actors/add", component: ActorAddPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/actors/edit", render: function () { return (react_1["default"].createElement(ActorSearch_1["default"], { item: DashboardLink_1["default"], relativePath: "/dashboard/actors/edit", searchLabel: "Search actors", title: "Edit actor" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/actors/edit/:id", render: function () { return (react_1["default"].createElement(BaseFormPage_1["default"], { form: ActorEditSelectedPage_1["default"], title: "Edit John Smith" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/repertoires", component: RepertoirePage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/repertoires/add", component: RepertoireAddPage_1["default"] }),
                react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/dashboard/repertoires/edit", render: function () { return (react_1["default"].createElement(RepertoireSearchPage_1["default"], { item: DashboardLink_1["default"], relativePath: "/dashboard/repertoires/edit", title: "Edit repertoire" })); } }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard/repertoires/edit/:id", component: RepertoireEditPage_1["default"] })))));
}
exports["default"] = Application;
