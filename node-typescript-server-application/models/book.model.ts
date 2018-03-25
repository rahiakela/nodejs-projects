import * as mongoose from 'mongoose';

// Defines a book
interface Book extends mongoose.Document{
    title: string;
    author: string;
    isbn: string;
}

export { Book };