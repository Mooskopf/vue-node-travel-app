import { db } from "../index";
import { Destination } from "../types";
import { StatusCodes } from "http-status-codes";
import { Response } from "express"

export function getDestinations(res: Response) {
    let sql = "SELECT * FROM `destinations`"
    let destinations: Destination[] = []

    db.query(sql, (err, result) => {
        if (err) throw err
        result.forEach((data: Destination) => {
            const destination = {
                name: data.name,
                color: data.color
            }
            destinations.push(destination)
        });

        if (Object.keys(destinations).length !== 0) {
            return res.status(StatusCodes.OK).json({ destinations: destinations })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "No destinations was found" })
        }
    })
}