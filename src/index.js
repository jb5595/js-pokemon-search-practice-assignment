document.addEventListener("DOMContentLoaded", function() {
  //pokemons is a variable imported from db.json via index.html as a script tag
  console.log(pokemons)
  document.querySelector("#pokemon-search-input").addEventListener("keyup", searchPokemon)
})

function searchPokemon(event){
  clearHTML()

  let searchTerm = document.querySelector("#pokemon-search-input").value
  if (searchTerm == ""){
    clearHTML()
  }
  else{
  let filteredPokemon = pokemons.filter(function(pokemon){
    return pokemon.name.includes(searchTerm.toLowerCase())
  })
  renderAll(filteredPokemon)
}
}

function clearHTML(){
  let parentNode = document.querySelector("#pokemon-container");
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

function renderAll(pokemons){
  for (pokemon of pokemons){
    render(pokemon)
  }
}

function render(pokemon){
  let parent = document.querySelector("#pokemon-container")
  let node = document.createElement("div")
  node.className = "pokemon-container"
  node.innerHTML = `<div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
    <h1 class="center-text">${pokemon.name}</h1>
    <div style="width:239px;margin:auto">
      <div style="width:96px;margin:auto">
        <img src="${pokemon.sprites.front}" id = "${pokemon.name}-image">
      </div>
    </div>
    <p style="padding:10px;" class="center-text flip-image" data-pokename="${pokemon.name}" data-action="flip-image" data-side = "front">flip card</p>
  </div>`
  parent.appendChild(node)
  node.querySelector("p").addEventListener("click", flipCard)
}

function flipCard(event){

  let pokeName = event.target.dataset.pokename
  let image = document.querySelector(`#${pokeName}-image`)
  let pokemon = pokemons.find(function(pokemonObject){
    return pokemonObject.name == pokeName
  })

  if (event.target.dataset.side == "front"){
    event.target.dataset.side = "back"
    image.src = pokemon.sprites.back

  }
  else{
    event.target.dataset.side = "front"
    image.src = pokemon.sprites.front
  }
}
