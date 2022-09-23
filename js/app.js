const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];


eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets=JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    })
}

//funciones
function agregarTweet(e) {
    e.preventDefault();

    //textea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validación...
    if(tweet === '') {
        mostrarError('un mensaje no puede ir vacio');

        return; //evita que se ejecuten mas lineas de código
    }
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    //una vez agregando vamos a crear el HTML 
    crearHTML();

    //reiniciar el formulario 
    formulario.reset();
}
//mostrar mensaje de error 
function mostrarError(error) {
    const mensajeError = document.createElement('p'); 
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}
//muestra un listado de los tweets
function crearHTML() {

    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach(tweet => {
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';
             
            //añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            //crear el HTML 
            const li = document.createElement('li');

            //añadir en el texto 
            li.innerText = tweet.tweet;

            //asignar el boton 
            li.appendChild(btnEliminar);

            //insertarlo en el html 
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
//agrega los tweets actuales a Localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

//limpiar el html 
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}