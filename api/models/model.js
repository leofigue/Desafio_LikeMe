const { pool } = require('../database/connection.js');
const { Pool } = require("pg");

const traePost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
  };

const agregaPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)"
  const values = [titulo, url, descripcion]
  const result = await pool.query(consulta, values)
  return result.rowCount
};  
    

module.exports= { traePost, agregaPost };