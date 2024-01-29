import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { Review } from "../models/Review";

export async function addReview(req: Request, res: Response) {

    const sql = `INSERT INTO reviews(author, destination, stars, text) VALUES ('${req.body?.review.author}', '${req.body?.destination}', '${req.body?.review.stars}', '${req.body?.review.text.toString()}')`

    try {
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function getReviews(req: Request, res: Response) {
    const sql = `SELECT * FROM reviews WHERE reviews.author = '${req.body.username}'`

    try {
        const result: any = await db.query(sql)

        const reviews: Review[] = []

        result[0].forEach((review: any) => {

            const data = {
                destination: review.destination,
                author: review.author,
                stars: review.stars,
                text: review.text
            }

            reviews.push(data)
        })

        return res.status(StatusCodes.OK).json({ reviews: reviews })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}