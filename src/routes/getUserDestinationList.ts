import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { UserDestination } from "../types";

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