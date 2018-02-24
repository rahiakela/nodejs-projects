import * as express from 'express';

/* GET home page. */
export function index(request: express.Request, response: express.Response) {
    response.render('index', {title: 'Express'});
}

/*
let index2= (request: express.Request, response: express.Response) => {
   response.render('index', {title: 'Express'});
};

module.exports = {
    index2: index2
};*/
