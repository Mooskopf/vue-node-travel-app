import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { addReview } from "../controller/ReviewController"
import { getReviews } from "../controller/ReviewController"

export const reviewsRouter = express.Router()

reviewsRouter.post("/add", verifyUser, addReview)
reviewsRouter.post("/", verifyUser, getReviews)