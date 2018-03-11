import * as express from 'express';
declare var next: (error: any) => void;


export function  list(request: express.Request, response: express.Response) {
    response.render('book', {'title': 'Books', 'books': []});
}

export function submit(request: express.Request, response: express.Response) {
    const newBook = {
        title: request.body.book_title,
        author: request.body.author,
        isbn: request.body.book_isbn
    };

    response.render('book', {title: 'Books', 'books': [newBook]});
}
