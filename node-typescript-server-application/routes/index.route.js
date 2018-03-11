"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
var index = function (request, response) {
    response.render('index', { title: 'Express' });
};
router.get('/', index);
exports.default = router;
