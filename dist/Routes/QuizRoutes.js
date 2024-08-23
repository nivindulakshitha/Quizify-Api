"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _QuizCreate = _interopRequireDefault(require("../Methods/QuizCreate.js"));
var _UserQuizFinish = _interopRequireDefault(require("../Methods/UserQuizFinish.js"));
var _QuizOpen = _interopRequireDefault(require("../Methods/QuizOpen.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var quizRouter = (0, _express.Router)();
quizRouter.post("/create", _QuizCreate["default"]);
quizRouter.post("/finish", _UserQuizFinish["default"]);
quizRouter.get("/take/:id", function (req, res) {
  res.send("\n        <html>\n            <head>\n                <title>Quizify</title>\n            </head>\n            <body>\n                <h1>Welcome to Quizify!</h1>\n                <p>This is the Quizify API.</p>\n            </body>\n        </html>\n    ");
});
var _default = exports["default"] = quizRouter;