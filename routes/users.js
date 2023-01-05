const { Router } = require("express");
const {
  getAllUsersHandler,
  createUserHandler,
  loginHandler,
  getUserHandler,
  deleteUserHandler,
  updateHandler,
} = require("../controllers/user");
const router = Router();

router.get("/", getAllUsersHandler);
router.get("/account/:id", getUserHandler);
router.post("/create", createUserHandler);
router.post("/auth", loginHandler);
router.put("/account/update/:id", updateHandler);
router.delete("/account/delete/:id", deleteUserHandler);

module.exports = router;
