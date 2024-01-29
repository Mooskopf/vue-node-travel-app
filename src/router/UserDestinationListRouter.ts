import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { addToUserDestinationList } from "../controller/UserDestinationListController"
import { getUserDestinationList } from "../controller/UserDestinationListController"


export const userDestinationListRouter = express.Router()

userDestinationListRouter.post("/", verifyUser, getUserDestinationList)
userDestinationListRouter.post("/add", verifyUser, addToUserDestinationList)