import express from "express"
import { verifyUser } from "../middleware/authMiddleware"
import { add, get, remove, updateNote } from "../controller/UserDestinationListController"

export const userDestinationListRouter = express.Router()

userDestinationListRouter.post("/", verifyUser, get)
userDestinationListRouter.post("/add", verifyUser, add)
userDestinationListRouter.delete("/", verifyUser, remove)
userDestinationListRouter.put("/updatenote", verifyUser, updateNote)