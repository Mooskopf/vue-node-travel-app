import { db } from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"
import type { User } from "../models/User";

export async function login(req: Request, res: Response) {

    const email: string = req.body.email
    let password: string = req.body.password

    const sqlMail = `SELECT * FROM users WHERE users.email = ?`

    try {
        const result: any = await db.query(sqlMail, email)

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "User does not exist" })
        }

        const user: User = {
            name: result[0][0].name,
            email: result[0][0].email
        }

        bcrypt.compare(password, result[0][0].password)
            .then(comparison => {
                if (comparison) {
                    const secret = process.env.ACCESS_TOKEN_SECRET as Secret

                    const token = jwt.sign({ email: email }, secret, {
                        expiresIn: '1d',
                    });

                    return res.status(StatusCodes.OK).json({ token: token, user: user })
                }

                return res.status(StatusCodes.FORBIDDEN).json({ msg: "Password not correct" })
            })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err })
    }
}