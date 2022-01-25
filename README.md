# Pokémon Card Project

## Description:
This site loads 100 different Pokémon names for users to reference, and allows users to query for Pokémon by name, then save the card containing Pokémon attributes to their local storage if desired. Once a user adds a Pokemon, they can view it at any time and delete the Pokémon.  

## Methodology:
This project was created withm simple Javascript, HTML and CSS. The program references the public [PokéAPI](https://pokeapi.co/) in GET requests via fetch to obtain relevant Pokémon information, chained through .then() for asynchronous execution. Local storage is used to save and persist Pokémon cards. Event listeners are used to signal when the DOM has loaded, to search for Pokémon (return button or click), to save and delete Pokémon cards (click).

## Usage:
Install nvm, Node.js v14.13.0 or higher, then clone this project to a local folder.

## Contributing:
All pull requests are welcome.

## License
[MIT](https://choosealicense.com/licenses/mit/)
