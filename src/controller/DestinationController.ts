import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import { Destination } from "../models/Destination";
import { Review } from "../models/Review";

export async function add(req: Request, res: Response) {

    const sqlName = `SELECT * FROM destinations WHERE destinations.name = ?`

    try {
        const result: any = await db.query(sqlName, req.body.destination.name)

        if (result[0].length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Destination exists" })
        }

        let sql = `INSERT INTO destinations(name, color) VALUES (?, ?)`

        await db.query(sql, [req.body.destination.name, req.body.destination.color])

        return res.status(StatusCodes.OK).json({ msg: "Added destination" })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}


export async function get(req: Request, res: Response) {
    const sql = "SELECT * FROM `destinations`"
    let destinations: Destination[] = []

    try {
        const result: any = await db.query(sql)

        for (let i = 0; i < result[0].length; i++) {

            const reviewSQL = `SELECT * FROM reviews WHERE reviews.destination = ?`
            const reviews: Review[] = []

            const reviewResult: any = await db.query(reviewSQL, result[0][i].name)

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