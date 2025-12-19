import mysql from "mysql2/promise"

export const db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "reis",
    database: "trabalho",
    port: 3306,
})

//teste de conexão com o mysql
try{
    const conn = await db.getConnection()
    console.log("db conectado com sucesso")
    conn.release()
}catch(err){
    console.log("deu merda no db:",err)
}
