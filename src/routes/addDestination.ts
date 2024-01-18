import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"

export function addDestination(req: Request, res: Response) {

    let sql = `INSERT INTO destinations(name, color) VALUES ('${req.body?.destination.name}', '${req.body?.destination.color}')`

    db.query(sql, (err) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })

        return res.status(StatusCodes.OK).json({ msg: "Added destination" })
    })
}
