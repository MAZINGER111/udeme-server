const crypto = require("crypto");
const { User } = require("../models/user");

const createUser = async ({ fullname, email, role, password }) => {
  if (!fullname || !email || !role || !password) return;
  if (await User.exists({ email: email })) return "Account already exist";

  const user = new User();
  const salt = crypto.randomBytes(16).toString("hex");

  user.fullname = fullname;
  user.email = email;
  user.role = role;
  user.salt = salt;
  user.hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  const userInstace = await user.save();

  if (!userInstace) return "Error creating account";

  return userInstace;
};

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) return;
  const user = await User.findOne({ email: email });

  if (!user) return "Invalid email address";

  if (
    user.hash !==
    crypto.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`).toString(`hex`)
  )
    return "Wrong Password";
  else return user;
};

const getAllUsers = async () => {
  const allUsers = await User.find({});

  return allUsers;
};

const getUserById = async ({ id }) => {
  if (!id) return;

  const user = await User.findById(id).exec();
  if (!user) return "User not found";

  return user;
};

const updateUser = async ({ id, newData }) => {
  const updatedUser = await User.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return updatedUser;
};

const deleteUser = async ({ id }) => {
  if (!id) return "User not found";

  const deletedData = await User.deleteOne({ _id: id });
  return deletedData.deletedCount;
};

module.exports = {
  createUser,
  authenticateUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
