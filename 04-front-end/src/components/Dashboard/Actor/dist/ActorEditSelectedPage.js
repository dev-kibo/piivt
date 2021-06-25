"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var ActorService_1 = require("../../../services/ActorService");
var CustomAlert_1 = require("../../Alert/CustomAlert");
var useFetchActor_1 = require("../../../hooks/useFetchActor");
function ActorEditSelectedPage() {
    var _this = this;
    var _a = react_1.useState(""), firstName = _a[0], setFirstName = _a[1];
    var _b = react_1.useState(""), lastName = _b[0], setLastName = _b[1];
    var _c = react_1.useState(""), middleName = _c[0], setMiddleName = _c[1];
    var _d = react_1.useState(true), isDisabled = _d[0], setIsDisabled = _d[1];
    var _e = react_1.useState(""), message = _e[0], setMessage = _e[1];
    var _f = react_1.useState(false), isAlertShown = _f[0], setIsAlertShown = _f[1];
    var _g = react_1.useState("success"), alertVariant = _g[0], setAlertVariant = _g[1];
    var id = react_router_dom_1.useParams().id;
    var actor = useFetchActor_1["default"](+id)[0];
    react_1.useEffect(function () {
        if (firstName.length > 0 && lastName.length > 0) {
            setIsDisabled(false);
        }
        else {
            setIsDisabled(true);
        }
    }, [firstName, lastName]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    if (!(firstName.length > 1 && lastName.length > 1)) return [3 /*break*/, 4];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ActorService_1["default"].editActor(+id, {
                            firstName: firstName,
                            lastName: lastName,
                            middleName: middleName
                        })];
                case 2:
                    _b.sent();
                    setMessage("Updated actor successfully.");
                    setAlertVariant("success");
                    setIsAlertShown(true);
                    setFirstName("");
                    setMiddleName("");
                    setLastName("");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    if ((error_1 === null || error_1 === void 0 ? void 0 : error_1.status) === 409) {
                        setMessage((_a = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) === null || _a === void 0 ? void 0 : _a.description);
                        setAlertVariant("danger");
                        setIsAlertShown(true);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_bootstrap_1.Row, { className: "justify-content-center h-100 align-items-center" },
        react_1["default"].createElement(react_bootstrap_1.Col, null,
            react_1["default"].createElement(react_bootstrap_1.Row, { xs: 1, md: 2, lg: 3, className: "justify-content-center" },
                react_1["default"].createElement(react_bootstrap_1.Col, null,
                    react_1["default"].createElement(react_bootstrap_1.Row, null,
                        react_1["default"].createElement(react_bootstrap_1.Col, { className: "text-center" },
                            react_1["default"].createElement("p", { className: "display-4" },
                                "Edit ", actor === null || actor === void 0 ? void 0 :
                                actor.firstName,
                                " ",
                                (actor === null || actor === void 0 ? void 0 : actor.middleName) ? actor.middleName.slice(0, 1) + "." : "",
                                " ", actor === null || actor === void 0 ? void 0 :
                                actor.lastName))),
                    react_1["default"].createElement(react_bootstrap_1.Row, { className: "mt-5" },
                        react_1["default"].createElement(react_bootstrap_1.Col, null,
                            isAlertShown ? (react_1["default"].createElement(CustomAlert_1["default"], { message: message, setIsAlertShown: setIsAlertShown, variant: alertVariant })) : (""),
                            react_1["default"].createElement(react_bootstrap_1.Form, { onSubmit: handleSubmit },
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { className: "pb-3" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "First name:"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Enter first name", size: "lg", value: firstName, onChange: function (e) { return setFirstName(e.target.value); } })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { className: "pb-3" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Middle name (optional):"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Enter middle name", size: "lg", value: middleName, onChange: function (e) { return setMiddleName(e.target.value); } })),
                                react_1["default"].createElement(react_bootstrap_1.Form.Group, { className: "pb-3" },
                                    react_1["default"].createElement(react_bootstrap_1.Form.Label, null, "Last name:"),
                                    react_1["default"].createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Enter last name", size: "lg", value: lastName, onChange: function (e) { return setLastName(e.target.value); } })),
                                react_1["default"].createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", className: "w-100 mt-4", disabled: isDisabled }, "Apply changes")))))))));
}
exports["default"] = ActorEditSelectedPage;
