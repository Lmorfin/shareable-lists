const router = require("express").Router();

const {
  createPost,
  fetchPost,
  updatePost,
} = require("../controllers/listsController");

router.post("/create-list", createPost);
router.post("/update-list", updatePost);
router.get("/:uuid", fetchPost);

module.exports = router;
