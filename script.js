// Elementos del DOM
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImg = document.querySelector('.img-pokemon');
const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const buttonPrev = document.querySelector('.ir');
const buttonNext = document.querySelector('.ir1');

let searchPokemon = 1;

// Función para obtener datos del Pokémon
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!response.ok) alert('Pokemon no encontrado, verifica el Id que acabas de ingresar');/*Si la respuesta no fue exitosa (si !response.ok es true), esta línea arroja un nuevo objeto 
        Error con el mensaje "Pokemon no encontrado". 
        Esto detiene la ejecución de la función fetchPokemon y pasa el control al bloque catch donde se manejará este error. */
        return await response.json();
    } catch (error) {
        throw error;
        /*La declaración throw genera una excepción definida por el usuario. La ejecución de 
        la función actual se detendrá (las declaraciones posteriores al lanzamiento no se ejecutarán) y el control se pasará al
         primer bloque catch en la pila de llamadas. Si no existe ningún bloque catch entre las funciones de la persona que llama, el programa terminará. */
    }
};

// Función para renderizar los datos del Pokémon
const renderPokemon = async (pokemon) => {
    /*Esta línea define una función renderPokemon que toma un argumento pokemon. 
    La función está definida como asíncrona (async), lo que significa que puede contener operaciones 
    asincrónicas como llamadas a API. */
    try { 
    /*La palabra clave await se utiliza para esperar a que la promesa devuelta por fetchPokemon se resuelva, 
    lo que significa que la ejecución de la función se pausará hasta que la promesa se cumpla. */
        const data = await fetchPokemon(pokemon);
        pokemonName.textContent = data.name;
        pokemonNumber.textContent = data.id;
        pokemonImg.src = data.sprites.versions['generation-v']['black-white'].animated.front_default; //Diferentes tipos de fotos del personaje 
        pokemonImg.style.display = 'block'; //Hace que todas las imagenes queden en el mismo citio
        input.value = ''; //Se ingresa vacio, para qe se llene con la informacion del nombre y el numero del pokemon que ingrese el usuario
        searchPokemon = data.id;
    } catch (error) {
        pokemonName.textContent = 'Error...';
        pokemonNumber.textContent = '';
        pokemonImg.style.display = 'none';
        /*En el bloque catch, se actualizan los elementos del DOM para indicar que ha ocurrido un error y que el usuario debe
         "arreglarlo". Se oculta la imagen del Pokémon y se elimina el contenido del número del Pokémon. */
    }

    
};

// Evento para buscar un Pokémon
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Evento para ir al Pokémon anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

// Evento para ir al Pokémon siguiente
buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

// Renderizar el Pokémon inicial
renderPokemon(searchPokemon);