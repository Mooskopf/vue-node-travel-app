import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import type { User } from "../models/User";

export async function register(req: Request, res: Response) {

    const user: User = req.body.user
    let password = req.body.password

    const sqlMail = `SELECT * FROM users WHERE users.email = ?`

    try {
        const resultMail: any = await db.query(sqlMail, user.email)

        if (resultMail[0].length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Email exists" })
        }

        const sqlName = `SELECT * FROM users WHERE users.name = ?`

        const resultName: any = await db.query(sqlName, user.name)

        if (resultName[0].length !== 0) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Username exists" })
        }

        await bcrypt.hash(password, 10)
            .then(hash => {
                password = hash
            }).catch(err => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
                return
            })

        const sql = `INSERT INTO users(name, email, password) VALUES (?, ?, ?)`

        await db.query(sql, [user.name, user.email, password])

        return res.status(StatusCodes.OK).json({ msg: "User added" })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}