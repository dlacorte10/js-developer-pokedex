
const pokeApi = {}
const pokeApiModalDetail = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApiModalDetail.getPokemonModalDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())

}

const pokeId = "1"

function loadPokeDetails(urlDetail) {

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`

    return fetch(url)
        .then((response) => {response.json();debugger})
        .then((jsonBody) => jsonBody.results)
        //.then((abilitiesDetails) => abilitiesDetails.map())
        //.then((abilitiesDetailsArray) => {
            
        //    console.log(abilitiesDetailsArray)
        //    for (let i = 0; i < abilitiesDetailsArray.length; i++) {
        //        const element = abilitiesDetailsArray[i];
        //        console.log(element)
        //    }
        //})         
  
}

pokedetails = loadPokeDetails(pokeId)
console.log(pokedetails) 
//console.log("eueu",loadPokeDetails(pokeId))

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
