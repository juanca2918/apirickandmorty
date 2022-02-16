const main = document.getElementById("main")
const dato1 = document.getElementById('buscar')
const dato2 = document.getElementById("input")
const seleccion = document.getElementById('seleccion')

dato1.addEventListener("click", () => {
  console.log(dato2.value)
  traercapitulo(seleccion.value, dato2.value)
})

dato2.addEventListener("keydown", (e) => {
  traercapitulo(seleccion.value, dato2.value)
})

seleccion.addEventListener("change", (e) => {
  traercapitulo(e.target.value, dato2.value)
})

async function traercapitulo(capitulo=1, filtro="") {
  const { characters } = await getepisodes(capitulo)
  const getallcharacters = characters.map(async (i) => {
    return await getcharacter(i)
  })
  const promesasresueltas = await Promise.all(getallcharacters)
  main.innerHTML = promesasresueltas.filter((item) => filtro == "" ? true : item.name.includes(filtro)).map((item) => createCard(item)
  ).join("")
}

async function traerepisodios() {
  const cantidadepisodios = await getallepisodes()
  console.log(cantidadepisodios.info.count)
  seleccion.innerHTML = Array.from({ length: cantidadepisodios.info.count }, (_,index) => createOption(index+1)).join("")
}

const getepisodes = async (episode) => {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
  const data = await response.json()
  return data
}

const getallepisodes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/episode")
  const data = await response.json()
  return data
}

const getcharacter = async (character) => {
  const response = await fetch(character)
  const data = await response.json()
  return data
}

const createCard = (item) => `
<div class="card">
<p>${item.name}</p>
<p>${item.gender==='Male'? 'Hombre': 'Mujer' }</p>
<img class='image' src='${item.image}'></img>
<a href="${item.image}" target="_blank">
<button>Ver imagen</button>
</a>
</div>
`
const createOption = (item) => `
<option value="${item}">${item}</option>
`

traercapitulo()
traerepisodios()