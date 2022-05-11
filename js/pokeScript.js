const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('id');

const generateHTML = pokemon => {
    const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name)
    const mostSpan = (type) => {
        if (type == undefined) {
            return ''
        } else {
            return `<span class="capitalize bg-[#00000021] text-lg py-1 px-5 rounded-2xl">${type}</span>`
        }
    }
    const main = document.querySelector('main')
    const body = document.querySelector('body')
    body.classList.add(`${elementTypes[0]}`)
    main.innerHTML = 
        `
            <div class="text-white p-4 flex">
                <div>
                    <h1 class="text-3xl capitalize text-white">${pokemon.name}</h1>
                    <div class="mt-4 flex gap-3">
                        <span class="capitalize bg-[#00000021] text-lg py-1 px-5 rounded-2xl">${elementTypes[0]}</span>
                        ${mostSpan(elementTypes[1])}
                    </div>
                </div>                
                <span class="w-full flex justify-end opacity-20">#${pokemon.id}</span>
            </div>

            <div class="w-full flex justify-end">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="pikachu" class="w-80 -mt-20 z-50 -mr-16">
            </div>

            <div class="w-full bg-white rounded-t-3xl">
                <ul class="flex justify-between w-full">
                    <li class="flex justify-center items-center w-full p-4 border-r-2 h-14">About</li>
                    <li class="flex justify-center p-4 border-r-2 h-14 w-full">Base Stats</li>
                    <li class="flex justify-center p-4 border-r-2 h-14 w-full">Evolution</li>
                    <li class="flex justify-center p-4 h-14 w-full">Moves</li>
                </ul>
            </div>
        `
}

const apiPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${myParam}`
    const data = await fetch(url)
    const pokemon = await data.json()
    generateHTML(pokemon)
}   

apiPokemon()