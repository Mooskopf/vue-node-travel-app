import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"

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