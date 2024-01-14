import express, { Request, Response } from "express"
import { addDestination } from "../routes/addDestination"
import { getDestinations } from "../routes/getDestinations"

export const router = express.Router()

router.post("/adddestination", (req: Request, res: Response) => {
    addDestination(req, res)
})

router.get("/getdestinations", (req: Request, res: Response) => {
    getDestinations(res)
})