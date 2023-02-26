const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

// Buttons
const btnprev = document.querySelector('.btn-prev');
const btnnext = document.querySelector('.btn-next');

// Initial Pokemon
let searchPokemon = 1;
// Pull PokemonAPI
const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // Error Handling
    if (!APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    const data = await APIResponse.json();
    return data;
}

// Render Pokemon
const renderPokemon = async (pokemon) => {
    // Loading
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    // Pull all pokemon data/info
    try {
        const data = await fetchPokemon(pokemon);
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        input.value = '';
        searchPokemon = data.id;
    } catch (error) {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
    }
}
// Search Pokemon/Put all letters in lower case
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
// Prev/Next Pokemon
btnprev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon-= 1;
        renderPokemon(searchPokemon);
    }
});

btnnext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
// Render Initial Pokemon
renderPokemon(searchPokemon);