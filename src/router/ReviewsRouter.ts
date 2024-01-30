import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { add, get } from "../controller/ReviewController"

export const reviewsRouter = express.Router()

reviewsRouter.post("/add", verifyUser, add)
reviewsRouter.post("/", verifyUser, get)