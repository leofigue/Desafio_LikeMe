const { pool } = require('../database/connection.js');


const traePost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
    //console.log(rows);
    return rows;
  };

const agregaPost = async (titulo, url, descripcion) => {
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, 0)"
  const values = [titulo, url, descripcion]
  const result = await pool.query(consulta, values)
  return result.rowCount
}; 

const actualizaPost = async ({id}) => {
  const consulta = "UPDATE posts SET likes=likes+1 WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
  return result.rowCount
};  

const eliminaPost = async ({id}) => {
  const consulta = "DELETE FROM posts WHERE id = $1"
  const values = [id]
  const result = await pool.query(consulta, values)
  return result.rowCount
};  
    

module.exports= { traePost, agregaPost, actualizaPost, eliminaPost };