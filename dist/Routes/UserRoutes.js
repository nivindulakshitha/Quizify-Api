"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _UserRegistration = _interopRequireDefault(require("../Methods/UserRegistration.js"));
var _UserForgotPassword = _interopRequireDefault(require("../Methods/UserForgotPassword.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRouter = (0, _express.Router)();
userRouter.post("/register", _UserRegistration["default"]);
userRouter.post("/forgot-password", _UserForgotPassword["default"]);
var _default = exports["default"] = userRouter;