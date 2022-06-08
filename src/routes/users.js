const router = require("./productsRouter");

router.get ("/login", usersController.login);

module.exports = router; 

