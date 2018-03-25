import * as express from 'express';
import {Book} from "../config/db-config";
declare var next: (error: any) => void;

/* GET /book */
let  list = (request: express.Request, response: express.Response) => {
    // fetch book from mongodb
    Book.find({})
        .then((books) => response.render('book', {'title': 'Books', 'books': books}))
        .catch((err) => next(err));
};

/* POST /book */
let submit = (request: express.Request, response: express.Response) => {
    const newBook = new Book({
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    });

    // save book into mongodb
    newBook.save()
        .then((res) => response.redirect('/book'))
        .catch((err) => next(err));
};

// export the function for other module import
export {list, submit};