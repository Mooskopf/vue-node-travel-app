import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"

export async function addDestination(req: Request, res: Response) {

    const sqlName = `SELECT * FROM destinations WHERE destinations.name = '${req.body?.destination.name}'`

    try {
        const result: any = await db.query(sqlName)

        if (result[0].length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Destination exists" })
        }

        let sql = `INSERT INTO destinations(name, color) VALUES ('${req.body?.destination.name}', '${req.body?.destination.color}')`

        await db.query(sql)

        return res.status(StatusCodes.OK).json({ msg: "Added destination" })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}
