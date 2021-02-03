let pokemonRepository = function () {
    let e = [],
        t = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function n(t) {
        "object" == typeof t && "name" in t ? e.push(t) : console.log("pokemon is not correct")
    }

    function o(e, t) {
        i(e).then(function (e) {
            ! function (e) {
                let t = document.getElementById("modal-body"),
                    n = document.getElementById("pokemon-name");
                t.innerHTML = "", n.innerHTML = "";
                let o = document.createElement("img");
                o.classList.add("img"), o.src = e.imageUrl;
                let i = document.createElement("p");
                n.innerHTML = e.name, i.innerHTML = `Height: ${e.height}m`, t.appendChild(o), t.appendChild(i)
            }(e)
        })
    }

    function i(e) {
        let t = e.detailsUrl;
        return fetch(t).then(function (e) {
            return e.json()
        }).then(function (t) {
            return e.imageUrl = t.sprites.front_default, e.height = t.height, e.types = t.types, e
        }).catch(function (e) {
            console.error(e)
        })
    }
    document.querySelector("#modal-container");
    return window.addEventListener("keydown", e => {
        let t = document.querySelector("#modal-container");
        "Escape" === e.key && t.classList.contains("is-visible") && hideModal()
    }), {
        add: n,
        getAll: function () {
            return e
        },
        addListItem: function (e) {
            let t = document.querySelector(".list-group"),
                n = document.createElement("li");
            n.classList.add("list-group-item", "container", "col-6");
            let i = document.createElement("button");
            i.innerText = e.name, i.classList.add("button", "btn", "btn-primary", "btn-lg", "btn-block", "col-12"), i.setAttribute("data-bs-toggle", "modal"), i.setAttribute("data-bs-target", "#pokemonDetailsModal"), n.appendChild(i), t.appendChild(n), i.addEventListener("click", function () {
                o(e)
            })
        },
        loadList: function () {
            return fetch(t).then(function (e) {
                return e.json()
            }).then(function (e) {
                e.results.forEach(function (e) {
                    n({
                        name: e.name,
                        detailsUrl: e.url
                    })
                })
            }).catch(function (e) {
                console.error(e)
            })
        },
        loadDetails: i
    }
}();
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
        pokemonRepository.addListItem(e)
    })
});