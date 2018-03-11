"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bookController = require("../controllers/book.controller");
var router = express.Router();
/* GET /book */
router.get('/', bookController.list);
/* POST /book */
router.post('/', bookController.submit);
exports.default = router;
