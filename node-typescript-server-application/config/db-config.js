"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
// MongoDB typically runs on port 27017
mongoose.connect('mongodb://localhost:27017/books');
// Defines the book database schema
var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String
});
var Book = mongoose.model('Book', bookSchema);
exports.Book = Book;
