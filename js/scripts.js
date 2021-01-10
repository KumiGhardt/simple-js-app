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

for (let i = 0; i < pokemonList.length; i++) {
    //target the height in the object to compose the ef-else conditions
    if (pokemonList[i].height >= 1) {
        document.write(`<div>${pokemonList[i].name} (Height ${pokemonList[i].height}) - Wow, that’s big</div> `) //used template literal form to concatenate the name and height from the array
    } else {
        document.write(`<div>${pokemonList[i].name} (Height ${pokemonList[i].height}) `)
    }
};

