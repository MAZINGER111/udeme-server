const { Router } = require("express");
const {
  createBlogPostHandler,
  getAllBlogPostsHandler,
  getBlogPostHandler,
  updateHandler,
  deleteBlogPostHandler,
} = require("../controllers/blog");

const router = Router();

router.get("/", getAllBlogPostsHandler);
router.get("/post/:id", getBlogPostHandler);
router.post("/create", createBlogPostHandler);
router.put("/post/update/:id", updateHandler);
router.delete("/post/delete/:id", deleteBlogPostHandler);

module.exports = router;
