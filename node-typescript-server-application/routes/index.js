"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* GET home page. */
function index(request, response) {
    response.render('index', { title: 'Express' });
}
exports.index = index;
/*
let index2= (request: express.Request, response: express.Response) => {
   response.render('index', {title: 'Express'});
};

module.exports = {
    index2: index2
};*/
