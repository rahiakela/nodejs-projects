"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var indexRouter = express.Router();
/* GET home page. */
var index = function (request, response) {
    response.render('index', { title: 'Express' });
};
indexRouter.get('/', index);
exports.default = indexRouter;
