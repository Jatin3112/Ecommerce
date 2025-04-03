import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/users", getUsers);

export default userRouter;
