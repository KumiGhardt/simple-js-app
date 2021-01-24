let pokemonRepository = (function () {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list'); // create a variable and  assign it the ul
        let listItem = document.createElement('li'); //create li for the ul
        let button = document.createElement('button'); //create button- styled on css
        button.innerText = pokemon.name;
        button.classList.add('button');
        listItem.appendChild(button); //append the button to the list item as its child.
        list.appendChild(listItem); // append the list item to the unordered list as its child.
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }
    //function dedicated to adding an event listener to the newly created button 
    function buttonListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function getAll() {
        return pokemonList;
    }
    //loadlist (promise  fetch) function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.add({
    name: "Nidoking",
    height: 1.4,
    types: ["ground", "poison"]
});


pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});