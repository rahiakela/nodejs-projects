let router = require('express').Router();
let controller = require("../controllers/users-controller");

/* users/address crud methods listing. */
router.get('/', controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.createUser);
router.post("/:id/addresses", controller.createAddress);
router.put("/:id", controller.updateuser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
