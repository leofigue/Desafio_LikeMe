const { traePost, agregaPost, actualizaPost, eliminaPost } = require('./models/model.js');

var router = express.Router();

router.get('/posts', async (req, res) =>{
    res.json(await traePost());
} );

router.post('/posts', async(req, res, next) =>{

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

router.put('/posts/like/:id', async(req, res, next)=>{
    try {
        await actualizaPost(req.params) 
        res.send('OK');
    } catch (error) {
        next(error);   
    }
    
});

router.delete('/posts/:id', async (req, res, next)=>{
    try {
        if(await eliminaPostt(req.params)>0){
            res.send('OK');
        } 
        else{
            res.status(400).send('EL ID enviado no existe');
        }
    } catch (error) {

        next(error)
    }
    
});

// Custom error handling middleware 
app.use((err, req, res, next) => { 
    console.error(err); 
    res.status(500).json( 
        { message: err.stack }); 
});

module.exports= { router };