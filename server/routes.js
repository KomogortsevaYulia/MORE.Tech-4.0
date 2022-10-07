const Router = require("express");
const router = new Router();
const test=require("./controllers/test")

router.get("/test", test.get);

module.exports = router;