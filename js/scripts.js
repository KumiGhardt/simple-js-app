let pokemonRepository = (function () {
    let pokemonList = [{
            name: "Pikachu",
            height: 0.4,
            types: ["electric"]
        },
        {
            name: "Wigglytuff",
            height: 1,
            types: ["fairy", "normal"]
        },
        {
            name: "Gloom",
            height: 0.8,
            types: ["grass", "poison"]
        },
        {
            name: "Poliwrath",
            height: 1.3,
            types: ["water", "fighting"]
        }
    ];

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
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

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({
    name: "Nidoking",
    height: 1.4,
    types: ["ground", "poison"]
});


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});



/*
if (pokemon.height >= 1) {
        document.write(`<div>${pokemon.name} (Height ${pokemon.height}) - Wow, that’s big</div> `) //used template literal form to concatenate the name and height from the array
    } else {
        document.write(`<div>${pokemon.name} (Height ${pokemon.height})</div> `)
    }
    */