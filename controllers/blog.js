const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../services/blog");

const createBlogPostHandler = async (req, res) => {
  const { title, featuredImage, createdBy, body } = req.body;

  if (!title || !featuredImage || !createdBy || !body)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const postOrError = await createBlogPost({
    title,
    featuredImage,
    createdBy,
    body,
  });

  return res.send({
    status: typeof postOrError !== "string" ? "OK" : "Error",
    post: postOrError,
  });
};

const getAllBlogPostsHandler = async (req, res) => {
  const posts = await getAllBlogPosts();
  return res.json({ success: true, posts });
};

const getBlogPostHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid post id" });

  const postOrError = await getBlogPostById({ id });
  return res.send({
    status: typeof postOrError !== "string" ? "OK" : "Error",
    post: postOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid post id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const postOrError = await updateBlogPost({ id, newData });

  return res.send({
    status: typeof postOrError !== "string" ? "OK" : "Error",
    post: postOrError,
  });
};

const deleteBlogPostHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid post id" });

  const deteledInstance = await deleteBlogPost({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Post not found" : "Post deleted",
  });
};

module.exports = {
  createBlogPostHandler,
  getAllBlogPostsHandler,
  getBlogPostHandler,
  updateHandler,
  deleteBlogPostHandler,
};
