import express, { Request, Response } from "express"
import { addDestination } from "../routes/addDestination"
import { getDestinations } from "../routes/getDestinations"
import { register } from "../routes/register"
import { login } from "../routes/login"
import { addReview } from "../routes/addReview"
import { verifyUser } from "../middleware/authMiddleware"

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