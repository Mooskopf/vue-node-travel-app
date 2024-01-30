import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { UserDestination } from "../models/UserDestination";

export async function add(req: Request, res: Response) {

    const sqlCheck = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = '${req.body.useremail}' AND userdestinationlist.destination = '${req.body.destination}'`

    try {
        const result: any = await db.query(sqlCheck)

        if (result[0].length > 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Exists" })
        }

        const sql = `INSERT INTO userdestinationlist(useremail, destination) VALUES ('${req.body.useremail}', '${req.body.destination}')`
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function get(req: Request, res: Response) {

    const sql = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = '${req.body.useremail}'`

    try {
        const result: any = await db.query(sql)

        const destinations: UserDestination[] = []

        result[0].forEach((userdestination: UserDestination) => {

            console.log(userdestination)
            destinations.push(userdestination)
        })

        return res.status(StatusCodes.OK).json({ destinations: destinations })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function remove(req: Request, res: Response) {

    const sql = `DELETE FROM userdestinationlist WHERE useremail='${req.body.useremail}' AND destination='${req.body.destination}'`

    try {
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Removed user destination" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function updateNote(req: Request, res: Response) {

    const sql = `UPDATE userdestinationlist SET note='${req.body.note}' WHERE userdestinationlist.useremail = '${req.body.useremail}' AND userdestinationlist.destination = '${req.body.destination}'`

    try {
        await db.query(sql)
        return res.status(StatusCodes.OK).json({ msg: "Updated note" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}