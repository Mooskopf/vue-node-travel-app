import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { UserDestination } from "../models/UserDestination";

export async function addToUserDestinationList(req: Request, res: Response) {

    const sqlCheck = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = '${req.body?.useremail}' AND userdestinationlist.destination = '${req.body?.destination}'`

    try {
        const result: any = await db.query(sqlCheck)

        if (result[0].length > 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Exists" })
        }

        const sql = `INSERT INTO userdestinationlist(useremail, destination) VALUES ('${req.body?.useremail}', '${req.body?.destination}')`
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function getUserDestinationList(req: Request, res: Response) {

    const sql = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = '${req.body.useremail}'`

    try {
        const result: any = await db.query(sql)

        const destinations: string[] = []

        result[0].forEach((userdestination: UserDestination) => {

            destinations.push(userdestination.destination)
        })

        return res.status(StatusCodes.OK).json({ destinations: destinations })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}