import {getAllMovies} from "../src/dataService.js"
import { userData } from "../src/userHelper.js"
import { showDetails } from "./detailsView.js"
import {getMovieDetails} from "../src/dataService.js"
const homeTemp = document.getElementById("home-page")
const catalog = document.getElementById("movies-list")
let context;
async function homeView(ctx){
    ctx.showSection(homeTemp)
    showMovies()
    ctx.updateNav()
    context = ctx

}
catalog.addEventListener("click",(event) => {
    if (event.target.tagName === "BUTTON") {
        
        event.preventDefault()

        let movieId = event.target.dataset.id
        showDetails(movieId,context)
    }
})

async function showMovies(){
    catalog.replaceChildren()
    const movies = await getAllMovies()
    catalog.replaceChildren(...movies.map(createMoviePreview))
}
function createMoviePreview(movie){
    let mainDiv = document.createElement("div")
    mainDiv.className = 'card mb-4'

    let imgEl = document.createElement("img")
    imgEl.classList.add('card-img-top')
    imgEl.src = movie.img
    imgEl.alt = 'Card image cap'
    imgEl.width = 400
    mainDiv.appendChild(imgEl)

    let cardBody = document.createElement("div")
    cardBody.classList.add('card-body')

    let h4 = document.createElement('h4')
    h4.classList.add('card-title')
    h4.textContent = movie.title

    cardBody.appendChild(h4)
    mainDiv.appendChild(cardBody)

    let cardFooter = document.createElement("div")
    cardFooter.classList.add('card-footer')

    let anchor = document.createElement('a')
    anchor.href = `/details/${movie._id}`

    let detailsBtn = document.createElement("button")
    detailsBtn.dataset.id = movie._id 
    detailsBtn.textContent = "Details"
    detailsBtn.className = 'btn btn-info'
    detailsBtn.type = 'button'


    anchor.appendChild(detailsBtn)
    cardFooter.appendChild(anchor)
    mainDiv.appendChild(cardFooter)

    return mainDiv
}

export {
    homeView
}