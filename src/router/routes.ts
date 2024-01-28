import express, { Request, Response } from "express"
import { verifyUser } from "../middleware/authMiddleware"

import { addDestination } from "../routes/addDestination"
import { getDestinations } from "../routes/getDestinations"
import { register } from "../routes/register"
import { login } from "../routes/login"
import { addReview } from "../routes/addReview"
import { getReviews } from "../routes/getReviews"
import { addToUserDestinationList } from "../routes/addToUserDestinationList"
import { getUserDestinationList } from "../routes/getUserDestinationList"

export const router = express.Router()

router.post("/register", (req: Request, res: Response) => {
    register(req, res)
})

router.post("/login", (req: Request, res: Response) => {
    login(req, res)
})

router.post("/adddestination", verifyUser, (req: Request, res: Response) => {
    addDestination(req, res)
})

router.get("/getdestinations", verifyUser, (req: Request, res: Response) => {
    getDestinations(res)
})

router.post("/addreview", verifyUser, (req: Request, res: Response) => {
    addReview(req, res)
})

router.post("/getreviews", verifyUser, (req: Request, res: Response) => {
    getReviews(req, res)
})

router.post("/getreviews", verifyUser, (req: Request, res: Response) => {
    getReviews(req, res)
})

router.post("/getuserdestinationlist", verifyUser, (req: Request, res: Response) => {
    getUserDestinationList(req, res)
})

router.post("/addtouserdestinationlist", verifyUser, (req: Request, res: Response) => {
    addToUserDestinationList(req, res)
})