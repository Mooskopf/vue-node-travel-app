import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import type { UserDestination } from "../models/UserDestination";
import { destinationExists, mailExists } from "../helpers/helpersWithQuery";

export async function add(req: Request, res: Response) {

    const sqlCheck = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = ? AND userdestinationlist.destination = ?`

    const email = req.body.useremail
    const destination = req.body.destination

    try {
        const checkMail = await mailExists(email)
        if (!checkMail) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Email does not exist" })
        }
        const checkDestination = await destinationExists(destination)
        if (!checkDestination) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: "Destination does not exist" })
        }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }

    try {
        const result: any = await db.query(sqlCheck, [email, destination])

        if (result[0].length > 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Exists" })
        }

        const sql = `INSERT INTO userdestinationlist(useremail, destination) VALUES (?, ?)`
        await db.query(sql, [email, destination])
        return res.status(StatusCodes.OK).json({ msg: "Added review" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function get(req: Request, res: Response) {

    const sql = `SELECT * from userdestinationlist WHERE userdestinationlist.useremail = ?`

    try {
        const result: any = await db.query(sql, req.body.useremail)

        const destinations: UserDestination[] = []

        result[0].forEach((userdestination: UserDestination) => {
            destinations.push(userdestination)
        })

        return res.status(StatusCodes.OK).json({ destinations: destinations })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function remove(req: Request, res: Response) {

    const sql = `DELETE FROM userdestinationlist WHERE useremail = ? AND destination = ?`

    try {
        await db.query(sql, [req.body.useremail, req.body.destination])
        return res.status(StatusCodes.OK).json({ msg: "Removed user destination" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}

export async function updateNote(req: Request, res: Response) {

    const sql = `UPDATE userdestinationlist SET note= ? WHERE userdestinationlist.useremail = ? AND userdestinationlist.destination = ?`

    try {
        await db.query(sql, [req.body.note, req.body.useremail, req.body.destination])
        return res.status(StatusCodes.OK).json({ msg: "Updated note" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}