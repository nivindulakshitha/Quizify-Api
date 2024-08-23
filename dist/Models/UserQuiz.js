"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var UserQuizSchema = new _mongoose["default"].Schema({
  userId: {
    type: String,
    required: true
  },
  quizId: {
    type: String,
    required: true
  },
  answers: [{
    questionId: {
      type: String,
      required: true
    },
    selectedOption: {
      type: Number,
      required: true
    }
  }],
  score: {
    type: Number,
    required: true
  },
  quizTakenDate: {
    type: Date,
    required: true,
    "default": Date.now
  }
});
var UserQuiz = _mongoose["default"].model("UserQuiz", UserQuizSchema);
var _default = exports["default"] = UserQuiz;