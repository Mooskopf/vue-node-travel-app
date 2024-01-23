import { db } from "../index";
import { Destination, Review } from "../types";
import { StatusCodes } from "http-status-codes";
import { Response } from "express"

export async function getDestinations(res: Response) {
    const sql = "SELECT * FROM `destinations`"
    let destinations: Destination[] = []

    try {
        const result: any = await db.query(sql)

        for (let i = 0; i < result[0].length; i++) {

            const reviewSQL = `SELECT * FROM reviews WHERE reviews.destination = '${result[0][i].name}'`
            const reviews: Review[] = []

            const reviewResult: any = await db.query(reviewSQL)

            reviewResult[0].forEach((review: any) => {

                const data = {
                    destination: result[0][i].name,
                    author: review.author,
                    stars: review.stars,
                    text: review.text
                }

                reviews.push(data)
            })

            const destination = {
                name: result[0][i].name,
                color: result[0][i].color,
                reviews: reviews
            }

            destinations.push(destination)
        }

        if (Object.keys(destinations).length !== 0) {
            return res.status(StatusCodes.OK).json({ destinations: destinations })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No destinations was found" })
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}