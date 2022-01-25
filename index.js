document.addEventListener("DOMContentLoaded", onbodyload)

let allPokeIDs = new Set();
let pokeDB = JSON.parse(localStorage.getItem("pokemonList")) || []; 

function onbodyload() {
    document.getElementById("searchInput").addEventListener("submit", callAPI)
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
            fetch(response.url, {
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
            .then(pokemon => {
                const ul = document.getElementById("100PokeList");
                const li = document.createElement("li");
                li.innerText = pokemon.species.name;
                ul.appendChild(li);
            })
        })
    })
    const savedPokeGrid = document.getElementById("savedPoke");
    pokeDB.forEach((pokemon) => { 
        allPokeIDs.add(pokemon.id);
        const singlePoke = document.createElement("div");
        singlePoke.setAttribute("class", "pokeCard")
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
        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.innerText = "Remove Pokémon";
        deleteButtonElement.addEventListener("click",  () => {
            allPokeIDs.delete(pokemon.id);
            const updatedDB = pokeDB.filter((pokeObj) => {
                return pokeObj.id !== pokemon.id;
            });
            pokeDB = updatedDB;
            localStorage.setItem("pokemonList", JSON.stringify(pokeDB));
            singlePoke.parentNode.removeChild(singlePoke);
        })
        singlePoke.appendChild(deleteButtonElement);
        savedPokeGrid.appendChild(singlePoke);

    })
}

function callAPI(event) {
    event.preventDefault();
    const pokeName = document.getElementById("pokeNameInput").value;
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
        const searchedPokeCard = document.createElement("div");
        const pokeImage = document.createElement('img');
        const pokeName2 = document.createElement("h4");
        const pokeAttributes = document.createElement("div");
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
            resetSearch()
        })

        const searchedPokeGrid = document.getElementById("searchedPoke");
        pokeImage.setAttribute("src", json.sprites.front_default);
        searchedPokeCard.setAttribute("class", "searchedPoke");
        searchedPokeCard.appendChild(pokeImage);
        searchedPokeCard.appendChild(pokeName2);
        searchedPokeCard.appendChild(pokeAttributes);
        searchedPokeGrid.appendChild(searchedPokeCard);


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
            singlePoke.setAttribute("class", "pokeCard");
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
            }, "").trim();
            newPTag4.innerText = "Abilities: " + ability.substring(0, ability.length - 1);
            deleteButtonElement.innerText = "Remove Pokémon";
            deleteButtonElement.addEventListener("click",  () => {
                allPokeIDs.delete(json.id);
                const updatedDB = pokeDB.filter((pokemon) => {
                    resetSearch()
                    return json.id !== pokemon.id;
                });
                pokeDB = updatedDB;
                localStorage.setItem("pokemonList", JSON.stringify(pokeDB));
                singlePoke.parentNode.removeChild(singlePoke);
            })

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
    const getPokeSearch = document.getElementById("searchedPoke");
    getPokeSearch.innerHTML = "";
    const getPokeForm = document.getElementById("searchInput");
    getPokeForm.reset();
}

