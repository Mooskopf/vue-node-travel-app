import { db } from "./index";

export function createDB(): boolean {
    let sql1 = "CREATE DATABASE travel_db"
    db.query(sql1, (err) => {
        if (err) throw err
    })

    let sql2 = "CREATE TABLE destinations(name varchar(255), color varchar(255))"
    db.query(sql2, (err) => {
        if (err) throw err
    })

    return true
}
