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
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height >= 1) {
        document.write(`<div>${pokemon.name} (Height ${pokemon.height}) - Wow, that’s big</div> `) //used template literal form to concatenate the name and height from the array
    } else {
        document.write(`<div>${pokemon.name} (Height ${pokemon.height})</div> `)
    }
});