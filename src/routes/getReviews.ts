import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { Review } from "../types";

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