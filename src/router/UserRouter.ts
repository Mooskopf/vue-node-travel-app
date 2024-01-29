import express from "express"

import { register } from "../controller/RegisterController"
import { login } from "../controller/LoginController"

export const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)