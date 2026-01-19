import mysql from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })


export const db = await mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    port: process.env.db_port,
})

try{
    const conn = await db.getConnection()
    console.log("db conectado com sucesso")
    conn.release()
}catch(err){
    console.log("Não foi possivel conectar no banco de dados:",err)
}
