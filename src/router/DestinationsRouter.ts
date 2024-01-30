import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { add, get } from "../controller/DestinationController"

export const destinationsRouter = express.Router()

destinationsRouter.post("/add", verifyUser, add)
destinationsRouter.get("/", verifyUser, get)