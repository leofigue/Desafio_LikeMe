import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {

  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const validarInput = (e) => {
    //alert(titulo)
    //Prevenimos el comportamiento por defecto
    //e.preventDefault()
    
    //Validación input
    if (titulo == '' || imgSrc == '' || descripcion == '' ) {
      return "NOK";
    }

    return "OK";

  }


  const limpiar = ()=>{
    setTitulo("");
    setImgSRC("");
    setDescripcion("");
  };

  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };

  const agregarPost = async () => {
    if (validarInput() == "OK") {
      const post = { titulo, url: imgSrc, descripcion };
      await axios.post(urlBaseServer + "/posts", post);
      getPosts();
      limpiar();
      alert("El post ha sido ingresado con exito")
    }
    else {
      alert("Debe ingresar información en todos los campos de formulario")
    }

  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    const respuesta = await axios.delete(urlBaseServer + `/posts/${id}`);
    if(respuesta.data=="OK"){
      getPosts();
      alert("El post ha sido eliminado")
    }
    else if(respuesta.data=="NOK"){
      alert("El ID indicado no existe")
    }
    else{
      alert("Ha ocurrido un error al momemnto de eliminar")
    }
    
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}
            setTitulo={setTitulo}
            imgSRC={imgSrc}
            setImgSRC={setImgSRC}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
