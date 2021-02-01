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
    ///POKEMOOON LIST///////////
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list'); // create a variable and  assign it the ul
        let listItem = document.createElement('li'); //create li for the ul
        let button = document.createElement('button'); //create button- styled on css
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-light');
        listItem.classList.add('list-group-item', 'list-group-item-dark', 'ml-md-auto');
        listItem.appendChild(button); //append the button to the list item as its child.
        list.appendChild(listItem); // append the list item to the unordered list as its child.
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
    }
    //function dedicated to adding an event listener to the newly created button 
    function buttonListener(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon, )
        });
    }

    function showDetails(pokemon, details) {
        loadDetails(pokemon).then(function (pokemonDetails) {
            //get pokemon details and add to modal
            showModal(pokemonDetails);
        });

    }

    function getAll() {
        return pokemonList;
    }

    //The LoadList() method will fetch data from the API, then add each Pokémon in the fetched data to pokemonList with the add function you implemented earlier. 
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
    ///You can then use the detailsUrl property to load the detailed data for a given Pokémon. For this, you add a loadDetails() function, which takes a Pokémon item as an argument:
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;

            return item;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //modal code
    let modalContainer = document.querySelector('.modal');

    function showModal(pokemonDetails) {
        console.log(pokemonDetails);
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal', 'modal-dialog');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        //add pokemon name
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemonDetails.name;

        //add height to pokemon details
        let contentElement = document.createElement('p');
        contentElement.innerText = `Height:  ${pokemonDetails.height}`;

        //add image to pokemon card
        let imgElement = document.createElement('img');
        imgElement.classList.add('img');
        imgElement.src = pokemonDetails.imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

    };

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }


    // modal escape key to hide the modal
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //event listener for clicking outside of the modal
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});