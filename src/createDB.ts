import { db } from "./index";

export default function createDB() {

    // try {
    //     db.query("CREATE DATABASE travel_db")
    // } catch (err) {
    //     console.log(err)
    // }

    try {
        db.query(`CREATE TABLE destinations (
                    name varchar(255),
                    color varchar(255)
                )`)
    } catch (err) {
        console.log(err)
    }

    try {
        db.query(`CREATE TABLE users (
                    name varchar(255),
                    email varchar(255),
                    password varchar(255)
                )`)
    } catch (err) {
        console.log(err)
    }

    try {
        db.query(`CREATE TABLE reviews (
                    destination varchar(255),
                    author varchar(255),
                    stars int,
                    text varchar(255)
                )`)
    } catch (err) {
        console.log(err)
    }

    try {
        db.query(`CREATE TABLE userdestinationlist (
                    useremail varchar(255),
                    destination varchar(255),
                    note varchar(255) DEFAULT ''
                )`)
    } catch (err) {
        console.log(err)
    }
}