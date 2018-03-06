let models = require("../models/models");
let oStream = require("../utils/ostreams");
let funcUtils = require("../utils/func_utils");
let _=require("lodash");
let jwt = require("jsonwebtoken");

let SECRET =  'this is a secret phrase';

let list = new oStream();
let newUsers = new oStream();
let getUser = new oStream();
let updateuser = new oStream();
let deleteUser = new oStream();
let newAdress = new oStream();

let get = funcUtils.get;
let map = funcUtils.map;
let filter = funcUtils.filter;
let isNotEmpty = funcUtils.isNotEmpty;

let find = (where, what) => {
    return () => models.users.find(where, what);
};
let populate = (what) => {
    return (query) => query.populate(what);
};
let execute = (query, done) => {
    return query.exec(done);
};
let findById = (id) => {
    return models.users.findById(id);
};
let findByIdAndUpdate = (params, done) => {
    return models.users.findByIdAndUpdate(params[0], params[1], {new : true}, done);
};
let findByIdAndDelete = (id, done) => {
    return models.users.findByIdAndRemove(id, done);
};
let toJSONResponse = (data) => {
    if (!data) {
        return this.customVars.httpResponse.status(401).json({ msg: 'unauthorized request'});
    }
    return this.customVars.httpResponse.json(data);
};
let callErrorHandler = (err) => {
    return this.customVars.next(err);
};
let filterWithMessage = (opts, fn) => {
    let self = this;

    return (data) => {
        let fnFilter = filter(fn);
        if (fnFilter(data) != null) {
            return data;
        } else {
            return self
                    .customVars
                    .httpResponse
                    .status(opts.code)
                    .json({error: true, msg: opts.msg});
        }
    };
};

newUsers.data
        .setVars({'httpResponse': get(1), 'next': get(2)})
        .then(get(0)) //if it's an int, it'll assume parameter is array
        .then(get('body')) //if it's a string, it'll assume parameer is object
        .then(models.users.create.bind(models.users))
        .done(toJSONResponse)
        .catch(callErrorHandler);

list.data
    .setVars({'httpResponse': get(1), 'next': get(2)})
    .then(get(0))
    .then(filterWithMessage({code: 401, msg: 'no token provided'}, (req) => {
        const token = req.query.token || (req.body && req.body.token);
        return !!token;
    }))
    .then(filterWithMessage({code: 401, msg: 'unauthorized request'}, (req, done) => {
        const token = req.query.token || (req.body && req.body.token);
        jwt.verify(token, SECRET, done);
    }))
    .then(find({}))
    .then(populate('addresses'))
    .then(execute)
    .done(toJSONResponse)
    .catch(callErrorHandler);

getUser.data
        .setVar('httpResponse', get(1))
        .then(get(0))
        .then(get('params.id'))
        .then(findById)
        .then(execute)
        .done((user) => {
            if (!user) {
                return this.customVars.httpResponse.sendStatus(404);
            }

            return this.customVars.httpResponse.json(user);
        })
        .catch((err) => {
            return this.customVars.httpResponse.status(500).json(err);
        });

updateUser.data
        .setVar('httpResponse', get(1))
        .then(get(0))
        .then(get('params.id', 'body'))
        .then(findByIdAndUpdate)
        .done(toJSONResponse)
        .catch((err) => {
            return this.customVars.httpResponse.status(500).json(err);
        });

deleteUser.data
        .setVar('httpResponse', get(1))
        .then(get(0))
        .then(get('params.id'))
        .then(findByIdAndDelete)
        .done(() => {
            return this.customVars.httpResponse.json({success: true});
        })
        .catch((err) => {
            return this.customVars.status(500).json(err);
        });

newAddress.data
    .setVar({'httpResponse': get(1), 'userId': (args) => args[0].params.id})
    .then(get(0))
    .then(get('body'))
    .then(models.addresses.create.bind(models.addresses))
    .then((address, done) => {
        models.users.findByIdAndUpdate(this.customVars.userId, {$push: {'addresses': address.id}}, {new: true}, done);
    })
    .then((user, done) => {
        models.users.populate(user, {path: 'addresses'}, done);
    })
    .done(toJSONResponse)
    .catch(callErrorHandler);

newTokens.data
    .setVars({'httpResponse': get(1)})
    .then(get(0))
    .then(map((req) => {
        return { username: req.body.username, password: req.body.password };
    }))
    .then(models.users.findOne.bind(models.users))
    .then(filterWithMessage({code: 404, msg: 'Invalid credentials'}, isNotEmpty))
    .then((usr) => {
        return jwt.sign({
            name: usr.first_name,
            birth_date: usr.birth_date
        }, SECRET , {"expiresIn": "1 day"})
    })
    .then(map((t) =>  { token: t }))
    .done(toJSONResponse)
    .catch(callErrorHandler);

let streams = {
    listUsersCollection: list,
	newUsersCollection: newUsers,
	getUserDataColection: getUser,
	updateUserCollection: updateUser,
	deleteUsersCollection: deleteUser,
	newAddressCollection: newAddress,
	newTokensCollection: newTokens
};

module.exports = streams;

    /*
let getUsers = (req, res, next) => {
    models.users.find({})
            .populate("addresses")
            .then(res.json.bind(res)) // we make sure the 'this' is correct when the function is called
            .catch(next);
};

let getUser = (req, res, next) => {
    models.users.findById(req.params.id)
            .populate("addresses")
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        error: true,
                        msg: "User not found"
                    });
                }
                return res.json(user);
            })
            .catch(next);
};

let createUser = (req, res, next) => {
    models.users.create(req.body)
            .then((user) => res.json(user))
            .catch(next);
};

let createAddress = (req, res, next) => {
    let addressPromise = models.addresses.create(req.body);
    let userPromise = addressPromise.then((address) => {
        return models.users.findById(req.params.id);
    });

    Promise.all([addressPromise, userPromise], ([address, user]) => {
        user.addresses.push(address._id);
        return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
};

let updateuser = (req,res, next) => {
    models.users.findByIdAndUpdate(req.params.id, req.body, {new: true}) // //{new: true} makes sure the updated document is returned
            .then((user) => res.json(user))
            .catch(next);
};

let deleteUser = (req, res, next) => {
    models.users.findByIdAndRemove(req.params.id)
            .then(() => res.status(200))
            .catch(next);
};

module.exports = {
    getUsers: getUsers,
    getUser : getUser,
    createUser: createUser,
    createAddress: createAddress,
    updateuser: updateuser,
    deleteUser: deleteUser
};
*/
