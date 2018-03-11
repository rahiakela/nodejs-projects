"use strict";
var express = require("express");
var index_route_1 = require("./index.route");
var book_route_1 = require("./book.route");
var router = express.Router();
// sub-routers
router.use('/', index_route_1.default);
router.use('/book', book_route_1.default);
module.exports = router;
