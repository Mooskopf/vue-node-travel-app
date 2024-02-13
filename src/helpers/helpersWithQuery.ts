import { db } from "../index";

export async function authorExists(author: string): Promise<boolean> {

    const sql = "SELECT * FROM users WHERE users.name = ?"

    let out = true

    try {
        const result: any = await db.query(sql, author)

        if (result[0].length === 0) {
            out = false
        }

    } catch (err) {
        throw err
    }

    return out
}

export async function destinationExists(destination: string): Promise<boolean> {
    const sql = "SELECT * FROM destinations WHERE destinations.name = ?"

    let out = true

    try {
        const result: any = await db.query(sql, destination)

        if (result[0].length === 0) {
            out = false
        }

    } catch (err) {
        throw err
    }

    return out
}

export async function mailExists(email: string): Promise<boolean> {
    const sql = "SELECT * FROM users WHERE users.email = ?"

    let out = true

    try {
        const result: any = await db.query(sql, email)

        if (result[0].length === 0) {
            out = false
        }


    } catch (err) {
        throw err
    }

    return out
}