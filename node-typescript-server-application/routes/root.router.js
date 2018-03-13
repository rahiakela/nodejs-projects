"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_route_1 = require("./index.route");
var book_route_1 = require("./book.route");
var rootRouter = express.Router();
// sub-routers
rootRouter.use('/', index_route_1.default);
rootRouter.use('/book', book_route_1.default);
// Export the router
exports.default = rootRouter;
