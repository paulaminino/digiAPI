document.addEventListener("DOMContentLoaded", function(){

const url = `https://digi-api.com/api/v1/digimon`;
const contenedor = document.getElementById('contenedor');
const btn = document.getElementById('searchButton');

function digiApi (apiUrl) { //Esta funcion le faltaba un parametro (apiUrl)
    fetch (apiUrl) //Se agrega el parametro de la funcion
    .then((res) => {
        if (!res.ok) {
            if (res.status===404) {
                alert("Ingresaste una ID de un personaje que no existe, intenta otra vez!")
            }
            throw new Error ("Ocurrió un error");
        }
        return res.json();
    })

.then ((data) => {
    const IDpersonaje = data.id;
    const name = data.name;
    const level = data.levels[0].level;
    const type = data.types[0].type;
    const release = data.releaseDate;
    const img = data.images[0].href;

contenedor.innerHTML = `
<h2>${name}</h2>
<p id="p1">ID personaje: ${IDpersonaje}</p>
<p>Nivel: ${level}</p>
<p>Tipo: ${type}</p>
<p>Primera aparición: ${release}</p>
<img id="imgcharacter" src="${img}" alt="${name}">
`; //Agregar un alt, por si la imagen no carga correctamente
})
.catch(error => { //Un .catch para detectar errores, en el caso que halla algun problema con la solicitud.
    console.error('Error al hacer el fetch:', error);
});

}

btn.addEventListener('click', function (){
 const busqueda = document.getElementById('searchTerm').value;
 const APIds = `${url}/${busqueda}`; //Construye la URL de la API utilizando la constante "url" y el ID ingresado por el usuario
 digiApi(APIds); //Llamar a la función con la URL construida
});

});

