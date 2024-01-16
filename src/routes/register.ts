import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import type { User } from "../types";

export function register(req: Request, res: Response) {

    const user: User = req.body?.user
    let password = req.body?.password

    const sqlMail = `SELECT * FROM users WHERE users.email = '${user.email}'`

    db.query(sqlMail, async (err, result) => {
        if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

        if (result.length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Email exists" })
        }

        await bcrypt.hash(password, 10)
            .then(hash => {
                password = hash
            }).catch(err => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
                return
            })

        const sql = `INSERT INTO users(name, email, password) VALUES ('${user.name}', '${user.email}', '${password}')`

        db.query(sql, (err) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

            return res.status(StatusCodes.OK).json({ msg: "User added" })
        })
    })
}
