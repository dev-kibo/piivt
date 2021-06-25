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
var api_1 = require("../api/api");
var api_2 = require("../api/api");
var MovieService = /** @class */ (function () {
    function MovieService() {
    }
    MovieService.getAll = function (searchTerm) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, api_1["default"]("get", "/movies?q=" + searchTerm)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    reject(error_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.getById = function (id, loadRoles) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var endpoint, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    endpoint = "/movies/" + id;
                                    if (loadRoles) {
                                        endpoint = endpoint + "/roles";
                                    }
                                    return [4 /*yield*/, api_1["default"]("get", endpoint)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // to do remove
    MovieService.getBySearchTerm = function (searchTerm) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, api_1["default"]("get", "/movies/search/" + searchTerm)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _a.sent();
                                    reject(error_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.getRolesForMovie = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, api_1["default"]("get", "/movies/" + id + "/roles")];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.add = function (_a) {
        var title = _a.title, description = _a.description, releaseDate = _a.releaseDate, duration = _a.duration, poster = _a.poster;
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var data, res, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    data = new FormData();
                                    data.append("title", title);
                                    data.append("description", description);
                                    data.append("releasedAt", releaseDate);
                                    data.append("duration", "" + duration);
                                    data.append("poster", poster);
                                    return [4 /*yield*/, api_2.apiAsForm("post", "/movies", data)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.update = function (movieId, _a) {
        var title = _a.title, description = _a.description, releaseDate = _a.releaseDate, duration = _a.duration, poster = _a.poster;
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var data, res, error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    data = new FormData();
                                    data.append("title", title);
                                    data.append("description", description);
                                    data.append("releasedAt", releaseDate);
                                    data.append("duration", "" + duration);
                                    if (poster) {
                                        data.append("poster", poster);
                                    }
                                    return [4 /*yield*/, api_2.apiAsForm("put", "/movies/" + movieId, data)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.data);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    reject(error_4);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.addRolesToMovie = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result, _i, data_1, role, response, error_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, , 6]);
                                    result = [];
                                    console.log(data);
                                    _i = 0, data_1 = data;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < data_1.length)) return [3 /*break*/, 4];
                                    role = data_1[_i];
                                    return [4 /*yield*/, api_1["default"]("post", "/roles", role)];
                                case 2:
                                    response = _a.sent();
                                    result.push(response.data);
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    resolve(result);
                                    return [3 /*break*/, 6];
                                case 5:
                                    error_5 = _a.sent();
                                    reject(error_5);
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.deleteRoles = function (movieId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, api_1["default"]("delete", "/movies/" + movieId + "/roles", data)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.status);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_6 = _a.sent();
                                    reject(error_6);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService.addOrUpdateMovieRoles = function (movieId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, api_1["default"]("put", "/movies/" + movieId + "/roles", data)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.status);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_7 = _a.sent();
                                    reject(error_7);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MovieService["delete"] = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var res, error_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, api_1["default"]("delete", "/movies/" + id)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res.status);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_8 = _a.sent();
                                    reject(error_8);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return MovieService;
}());
exports["default"] = MovieService;
