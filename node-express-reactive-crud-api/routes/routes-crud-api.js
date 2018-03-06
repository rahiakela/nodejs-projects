let router = require('express').Router();
let controller = require("../controllers/users-controller");
let _=require("lodash");

/* users/address crud methods listing. 
router.get('/', controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.post("/:id/addresses", controller.createAddress);
router.put("/:id", controller.updateuser);
router.delete("/:id", controller.deleteUser);*/

let mapping = {
    '/': {
        'get': controller.listUsersCollection,
        'post': controller.newUsersCollection
    },
    '/:id': {
        'get': controller.getUserDataColection,
        'put': controller.updateUserCollection,
        'delete': controller.deleteUsersCollection
    },
    '/:id/addresses': {
        'post': controller.newAddressCollection
    },
    '/tokens': {
        'post': controller.newTokensCollection
    }
};

// we setup the urls
_.each(mapping, (actions, url) => {
    _.each(actions, (controller, method) => {
        // this is the code that every route will actually execute
        router[method](url, () => controller.add(arguments)); //we pass the arguments object because we want to have access to all three parameters in one
    });
});

module.exports = router;
