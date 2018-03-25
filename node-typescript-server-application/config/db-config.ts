import * as mongoose from 'mongoose';
import {Book} from '../models/book.model';

// MongoDB typically runs on port 27017
mongoose.connect('mongodb://localhost:27017/books');

// Defines the book database schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String
});

const Book = mongoose.model<Book>('Book', bookSchema);

export {Book};