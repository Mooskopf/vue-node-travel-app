import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"

export function addDestination(req: Request, res: Response) {

    const sqlName = `SELECT * FROM destinations WHERE destinations.name = '${req.body?.destination.name}'`

    db.query(sqlName, (err, result) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })

        if (result.length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Destination exists" })
        }

        let sql = `INSERT INTO destinations(name, color) VALUES ('${req.body?.destination.name}', '${req.body?.destination.color}')`

        db.query(sql, (err) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })

            return res.status(StatusCodes.OK).json({ msg: "Added destination" })
        })
    })
}
