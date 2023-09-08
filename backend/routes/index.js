const router = require("express").Router();
const listsRoutes = require("./lists.routes");


router.use("/api/lists", listsRoutes);


module.exports = router;

