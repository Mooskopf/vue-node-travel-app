import express from "express"
import mysql from "mysql"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { router } from "./router/routes"

dotenv.config()

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

//Create Connection
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'travel_db'
})

//Connect
db.connect((err) => {
    if (err) throw err

    console.log("DB Connected")
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use("/", router)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})