require('dotenv').config()
const { traePost, agregaPost } = require('./models/model.js');
const express = require('express');


const app = express();
const cors = require('cors');
const PORT = process.env.PGPORT || 3000;




app.use(express.json());
app.use(cors());

app.get('/posts', async (req, res) =>{
    res.json(await traePost());
} );

app.post('/posts', async(req, res, next) =>{

    try {
        const { titulo, url, descripcion } = req.body;
        const filas = await agregaPost(titulo, url, descripcion)
        if(filas==0){ 
            return next(new Error('Ocurrió un error al ingresar el post')); 
        } 
        res.status(200).json({ message: 'El post ha sido ingresado'});

        
     } catch (error) {
        next(error);   
     }

    
} );

// Custom error handling middleware 
app.use((err, req, res, next) => { 
    console.error(err); 
    res.status(500).json( 
        { message: err.stack }); 
}); 

//Levanta el servidor
app.listen(PORT,console.log("Servidor iniciado!!!"));