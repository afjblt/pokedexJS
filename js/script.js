const hamburger = document.querySelector('.hamburger')
const sidebar = document.querySelector('.sidebar')
hamburger.addEventListener('click', handleClick)

let open = false

function handleClick() {
    if(!open) {
        hamburger.classList.add('active')
        sidebar.classList.add('open')
        open = true
    }else {
        hamburger.classList.remove('active')
        sidebar.classList.remove('open')
        open = false
    }    
}


const apiPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(898).fill().map((_, index) => 
    fetch(apiPokemon(index + 1)).then(res => res.json()))

const generateHTML = pokemons => pokemons.reduce((acc, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    const mostSpan = (type) => {
        if (type == undefined) {
            return ''
        } else {
           return `<span class="capitalize bg-[#00000021] text-xs py-1 px-2 rounded-2xl">${type}</span>`
        }
    }

        acc += `
            <a href="pokemonPage.html?id=${id}" class="card ${elementTypes[0]} cursor-pointer hover:scale-105 transition-all relative z-5 w-full h-[10.5rem] p-2 rounded-2xl flex justify-between gap-2">
                <div class="text-white p-4 flex flex-col gap-1">
                    <h2 class="capitalize text-xl">${name}</h2>
                    <span class="capitalize bg-[#00000021] text-xs py-1 px-2 rounded-2xl">${elementTypes[0]}</span>
                    ${mostSpan(elementTypes[1])}
                </div>
    
                <div class="w-1/2">
                    <span class="w-full flex justify-end opacity-20">#${id}</span>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="pikachu" class="w-full">
                </div>
                    <div class="absolute -z-1 -top-16 bottom-0 left-16 right-0 bg-[url('/img/pokebolaBG.webp')] opacity-[.2] bg-no-repeat bg-[length:20rem_20rem]"></div>
            </a>
        `
        return acc
}, '')

const insertPokemonsIntoPage = pokemons => {
    const cards = document.querySelector('.cards')
    cards.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage)

