const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const Upload = require("../middleware/file");
const multiparty = require("connect-multiparty");
const mult = multiparty();

//http://localhost:3003/api/post/savePost
router.post(
  "/savePost",
  mult,
  Upload,
  Auth,
  ValidateUser,
  PostController.savePost
);
//http://localhost:3003/api/post/listPost
router.get("/listPost", Auth, ValidateUser, PostController.listPost);
//http://localhost:3003/api/post/updatePost
router.put("/updatePost", Auth, ValidateUser, PostController.updatePost);
//http://localhost:3003/api/post/deletePost
router.delete(
  "/deletePost/:_id",
  Auth,
  ValidateUser,
  PostController.deletePost
);

module.exports = router;
