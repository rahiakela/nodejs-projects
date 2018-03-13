"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bookController = require("../controllers/book.controller");
var bookRouter = express.Router();
/* GET /book */
bookRouter.get('/', bookController.list);
/* POST /book */
bookRouter.post('/', bookController.submit);
exports.default = bookRouter;
