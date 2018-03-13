"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list = function (request, response) {
    response.render('book', { 'title': 'Books', 'books': [] });
};
exports.list = list;
var submit = function (request, response) {
    var newBook = {
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    };
    response.render('book', { title: 'Books', 'books': [newBook] });
};
exports.submit = submit;
