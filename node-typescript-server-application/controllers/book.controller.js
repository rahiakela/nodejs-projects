"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_config_1 = require("../config/db-config");
/* GET /book */
var list = function (request, response) {
    // fetch book from mongodb
    db_config_1.Book.find({})
        .then(function (books) { return response.render('book', { 'title': 'Books', 'books': books }); })
        .catch(function (err) { return next(err); });
};
exports.list = list;
/* POST /book */
var submit = function (request, response) {
    var newBook = new db_config_1.Book({
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    });
    // save book into mongodb
    newBook.save()
        .then(function (res) { return response.redirect('/book'); })
        .catch(function (err) { return next(err); });
};
exports.submit = submit;
