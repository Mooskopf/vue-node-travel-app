import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { Review } from "../models/Review";
import { isValidStarRange } from "../helpers/helpers";
import { authorExists, destinationExists } from "../helpers/helpersWithQuery";

export async function add(req: Request, res: Response) {

    const author = req.body.review.author
    const destination = req.body.destination
    const stars = req.body.review.stars
    const text = req.body.review.text.toString()

    if (text === "") {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Text cant be empty" })
    }

    if (!isValidStarRange(stars)) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Stars are no whole number between 1 and 5" })
    }

    try {
        const checkAuthor = await authorExists(author)
        if (!checkAuthor) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Author does not exist" })
        }
        const checkDestination = await destinationExists(destination)
        if (!checkDestination) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Destination does not exist" })
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }

    const sql = `INSERT INTO reviews(author, destination, stars, text) VALUES (?, ?, ?, ?)`

    try {
        await db.query(sql, [author, destination, stars, text])
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function get(req: Request, res: Response) {
    const author = req.body.username

    const sql = `SELECT * FROM reviews WHERE reviews.author = ?`

    try {
        const result: any = await db.query(sql, author)

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