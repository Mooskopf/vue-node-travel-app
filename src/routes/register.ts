import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import type { User } from "../types";

export async function register(req: Request, res: Response) {

    const user: User = req.body?.user
    let password = req.body?.password

    const sqlMail = `SELECT * FROM users WHERE users.email = '${user.email}'`

    try {
        const result: any = await db.query(sqlMail)

        if (result[0].length !== 0) {
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

        await db.query(sql)

        return res.status(StatusCodes.OK).json({ msg: "User added" })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}
