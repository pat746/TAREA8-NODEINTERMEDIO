const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinica'
})

//promise = promesa (futuro), inciertas (error, resolver)
async function testConnection(){
  try{
    //await = espera...
    const connection = await pool.getConnection()
    console.log("Conexion exitosa")
    connection.release() // release = liberar, dejar de usar el recurso
  }catch(error){
    console.error(error)
  }
}

testConnection()
module.exports = pool