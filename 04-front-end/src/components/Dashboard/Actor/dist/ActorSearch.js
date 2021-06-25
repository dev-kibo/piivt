"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var useFetchActors_1 = require("../../../hooks/useFetchActors");
function ActorSearch(_a) {
    var title = _a.title, relativePath = _a.relativePath, searchLabel = _a.searchLabel, Item = _a.item;
    var _b = react_1.useState(""), searchActorQuery = _b[0], setSearchActorQuery = _b[1];
    var data = useFetchActors_1["default"](searchActorQuery)[0];
    return (react_1["default"].createElement(react_bootstrap_1.Row, null,
        react_1["default"].createElement(react_bootstrap_1.Col, null,
            react_1["default"].createElement(react_bootstrap_1.Row, null,
                react_1["default"].createElement(react_bootstrap_1.Col, { className: "text-center" },
                    react_1["default"].createElement("p", { className: "m-0 display-5" }, title))),
            react_1["default"].createElement(react_bootstrap_1.Row, { className: "mt-5" },
                react_1["default"].createElement(react_bootstrap_1.Form.Group, null,
                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null,
                        searchLabel,
                        ":"),
                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", value: searchActorQuery, onChange: function (e) { return setSearchActorQuery(e.target.value); } }))),
            react_1["default"].createElement(react_bootstrap_1.Row, { xs: 1, md: 2, lg: 3, className: "gy-4 mt-5 justify-content-center" }, data.map(function (x) {
                console.log(x);
                var middleName = x.middleName
                    ? x.middleName.slice(0, 1) + "."
                    : "";
                return (react_1["default"].createElement(Item, { key: x === null || x === void 0 ? void 0 : x.actorId, title: (x === null || x === void 0 ? void 0 : x.firstName) + " " + middleName + " " + x.lastName, path: relativePath + "/" + (x === null || x === void 0 ? void 0 : x.actorId), styleClass: "btn-outline-secondary" }));
            })))));
}
exports["default"] = ActorSearch;
