document.addEventListener("DOMContentLoaded", onbodyload)

let allPokeIDs = new Set();
let pokeDB = JSON.parse(localStorage.getItem("pokemonList")) || []; 
function onbodyload() {
    document.getElementById("searchInput").addEventListener("submit", callAPI)
    const allPokemon = []
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    const res = fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
        },
        redirect: "follow",
        referrer: "no-referrer"
    }) 
    .then(response => response.json())
    .then((data) => {
        data.results.forEach((response) => {
            const pokemonResponse = fetch(response.url, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                },
                redirect: "follow",
                referrer: "no-referrer"
            }) 
            .then(response => response.json())
            .then(pokemon => console.log(pokemon))
            allPokemon.push(pokemonResponse)
        })
    })
    const savedPokeGrid = document.getElementById("savedPoke");
    pokeDB.forEach( (pokemon) => { 
        allPokeIDs.add(pokemon.id);
        const singlePoke = document.createElement("div");
        const savedPokeImage = document.createElement("img");
        savedPokeImage.setAttribute("src", pokemon.pictureURL);
        singlePoke.appendChild(savedPokeImage);
        Object.keys(pokemon).forEach( (pokeAttribute) => {
            const newPTag = document.createElement("p");
            if (pokeAttribute === "species") {
                newPTag.innerText = "Species: " + pokemon.species.name;
            } else if (pokeAttribute === "weight") {
                newPTag.innerText = "Weight: " + pokemon.weight;
            } else if (pokeAttribute === "height") {
                newPTag.innerText = "Height: " + pokemon.height;
            } else if (pokeAttribute === "abilities") {
                const ability = pokemon.abilities.reduce( (acc, currValue) => {
                    return acc.concat(currValue.ability.name + ", ")
                }, "")
                .trim();
                newPTag.innerText = "Abilities: " + ability.substring(0, ability.length - 1);
            } 
            singlePoke.appendChild(newPTag);
        });
        savedPokeGrid.appendChild(singlePoke)

    })
}

function callAPI(event) {
    event.preventDefault();
    const pokeName = document.getElementById("pokeNameInput").value;
    console.log(document.getElementById("pokeName"))
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    const res = fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
        },
        redirect: "follow",
        referrer: "no-referrer"
    }) 
    .then(response => response.json())
    .then(json => {
        const pokeImage = document.getElementById("pokeImage");
        const pokeName = document.getElementById("pokeName");
        const pokeAttributes = document.getElementById("pokeAttributes");
        pokeAttributes.innerHTML = "";
        ["height", "weight", "species", "abilities"].forEach( (pokeAttribute) => {
            const newPTag = document.createElement("p");
            if (pokeAttribute === "height") {
                newPTag.innerText = "Height: " + json.height;
            } else if (pokeAttribute === "weight") {
                newPTag.innerText = "Weight: " + json.weight;
            } else if (pokeAttribute === "species") {
                newPTag.innerText = "Species: " + json.species.name;
            } else if (pokeAttribute === "abilities") {
                const ability = json.abilities.reduce( (acc, currValue) => {
                    return acc.concat(currValue.ability.name + ", ")
                }, "")
                .trim();
                newPTag.innerText = "Abilities: " + ability.substring(0, ability.length - 1);
            } 
            pokeAttributes.appendChild(newPTag);
        })
        pokeImage.setAttribute("src", json.sprites.front_default);
        
        const saveButton = document.createElement("button");
        saveButton.innerText = "Save Pokémon";

        saveButton.addEventListener("click",  () => {
            if (allPokeIDs.has(json.id)) {
                alert ("You already caught this Pokémon!");
                resetSearch()
                return ;
            }

            const pokeToSave = { 
               name: json.name,
               height: json.height,
               weight: json.weight,
               species: json.species,
               abilities: json.abilities,
               pictureURL: json.sprites.front_default,
               id: json.id,
            };
            pokeDB.push(pokeToSave);
            allPokeIDs.add(json.id);
            localStorage.setItem("pokemonList", JSON.stringify(pokeDB));

            const savedPokeGrid = document.getElementById("savedPoke");
            const singlePoke = document.createElement("div");
            const savedPokeImage = document.createElement("img");
            savedPokeImage.setAttribute("src", json.sprites.front_default);
            singlePoke.appendChild(savedPokeImage);
           
            const newPTag = document.createElement("p");
            const newPTag2 = document.createElement("p");
            const newPTag3 = document.createElement("p");
            const newPTag4 = document.createElement("p");
            const deleteButtonElement = document.createElement("button");
            newPTag.innerText = "Height: " + json.height;
            newPTag2.innerText = "Weight: " + json.weight;
            newPTag3.innerText = "Species: " + json.species.name;
            const ability = json.abilities.reduce( (acc, currValue) => {
                return acc.concat(currValue.ability.name + ", ")
            }, "")
            .trim();
            newPTag4.innerText = "Abilities: " + ability.substring(0, ability.length - 1);
            deleteButtonElement.innerText = "Remove Pokémon";
            singlePoke.appendChild(newPTag);
            singlePoke.appendChild(newPTag2);
            singlePoke.appendChild(newPTag3);
            singlePoke.appendChild(newPTag4);
            singlePoke.appendChild(deleteButtonElement);
            savedPokeGrid.appendChild(singlePoke);
        

            resetSearch()
        })

        pokeAttributes.appendChild(saveButton);
        pokeName.innerText = json.name;
        }
    )
    return false;
}

function resetSearch() {
    const getPokeName = document.getElementById("pokeName");
    const getPokeAttributes = document.getElementById("pokeAttributes");
    getPokeName.innerHTML = "";
    getPokeAttributes.innerHTML = "";
    const getPokeForm = document.getElementById("searchInput");
    getPokeForm.reset();
    const getPokeImage = document.getElementById("pokeImage");
    getPokeImage.setAttribute("src", "");
}

function deleteThatPoke() {
        deleteButton.addEventListener("click",  () => {

        })

            const pokeToDelete = { 
               name: json.name,
               height: json.height,
               weight: json.weight,
               species: json.species,
               abilities: json.abilities,
               pictureURL: json.sprites.front_default,
               id: json.id,
            };
            pokeDB.pop(pokeToDelete);
            allPokeIDs.remove(json.id);
            // localStorage.setItem("pokemonList", JSON.stringify(pokeDB));
        }