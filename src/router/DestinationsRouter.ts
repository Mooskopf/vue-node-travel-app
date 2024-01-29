import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { addDestination } from "../controller/DestinationController"
import { getDestinations } from "../controller/DestinationController"

export const destinationsRouter = express.Router()

destinationsRouter.post("/add", verifyUser, addDestination)
destinationsRouter.get("/", verifyUser, getDestinations)