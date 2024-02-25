const { Discussion } = require("../models/discussion");
const { Blog } = require("../models/blog");
const ObjectId = require("mongoose").Types.ObjectId;

const createBlogPost = async ({ title, featuredImage, createdBy, body }) => {
  if (!title || !featuredImage || !createdBy || !body) return;

  const blog = new Blog();
  blog.title = title;
  blog.featuredImage = featuredImage;
  blog.body = body;
  blog.createdBy = createdBy;

  const blogInstace = await blog.save();

  if (!blogInstace) return "Error creating blog post";

  return blogInstace;
};

const getAllBlogPosts = async (page, postPerPage) => {
  const totalCount = await Blog.estimatedDocumentCount({});

  const allBlogPosts = await Blog.find({})
    .skip((page - 1) * postPerPage)
    .limit(postPerPage);

  return { posts: allBlogPosts, totalCount };
};

const getBlogPostById = async ({ id }) => {
  if (!id) return;

  const blog = await Blog.findById(id).exec();
  if (!blog) return "Post not found";

  return blog;
};

const updateBlogPost = async ({ id, newData }) => {
  const updatedPost = await Blog.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedPost;
};

const deleteBlogPost = async ({ id }) => {
  if (!id) return "Post not found";
  const deletedData = await Blog.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
