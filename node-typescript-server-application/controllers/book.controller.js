"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function list(request, response) {
    response.render('book', { 'title': 'Books', 'books': [] });
}
exports.list = list;
function submit(request, response) {
    var newBook = {
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    };
    response.render('book', { title: 'Books', 'books': [newBook] });
}
exports.submit = submit;
