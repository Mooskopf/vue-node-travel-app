import { StatusCodes } from "http-status-codes"
import jwt, { Secret } from "jsonwebtoken"
import { Request, Response } from "express"

export function verifyUser(req: Request, res: Response, next: Function) {
    const token = req.header('Authorization');
    if (!token) return res.status(StatusCodes.FORBIDDEN).json({ msg: "Access denied" })

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET as Secret
        jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: "Access denied" })
    }
}