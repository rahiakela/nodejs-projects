let models = require("../models/models");

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
