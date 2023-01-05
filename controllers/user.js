const {
  createUser,
  authenticateUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/user");

const getAllUsersHandler = async (req, res) => {
  const users = await getAllUsers();
  return res.json({ success: true, users });
};

const createUserHandler = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  if (!fullname || !email || !role || !password)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const userOrError = await createUser({ fullname, email, password, role });

  return res.send({
    status: typeof userOrError !== "string" ? "OK" : "Error",
    data: userOrError,
  });
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const userOrError = await authenticateUser({ email, password });

  return res.send({
    status: typeof userOrError !== "string" ? "OK" : "Error",
    data: userOrError,
  });
};

const getUserHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid user id" });

  const userOrError = await getUserById({ id });
  return res.send({
    status: typeof userOrError !== "string" ? "OK" : "Error",
    message: userOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid user id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const userOrError = await updateUser({ id, newData });

  return res.send({
    status: typeof userOrError !== "string" ? "OK" : "Error",
    message: userOrError,
  });
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid user id" });

  const deteledInstance = await deleteUser({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Account not registed" : "Account deleted",
  });
};

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  loginHandler,
  getUserHandler,
  deleteUserHandler,
  updateHandler,
};
