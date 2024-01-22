import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"

export async function addReview(req: Request, res: Response) {

    const sql = `INSERT INTO reviews(author, destination, stars, text) VALUES ('${req.body?.review.author}', '${req.body?.destination}', '${req.body?.review.stars}', '${req.body?.review.text.toString()}')`

    try {
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}