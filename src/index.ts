import express from "express"
import mysql from "mysql2/promise"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { router } from "./router/routes"

dotenv.config()

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

//Create Connection
export let db: mysql.Connection

mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'travel_db'
}).then(result => {
    db = result
}).catch(err => {
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use("/", router)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})