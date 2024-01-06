import { userData } from "../src/userHelper.js";
import { editMovie } from "../views/editMovie.js";
import {getMovieDetails} from "../src/dataService.js"
import { deleteMovie } from "../src/dataService.js";
import { likeMovie } from "../src/dataService.js";
import { getLikesCount } from "../src/dataService.js";
import { homeView } from "./homeView.js";
import { specificUserLike } from "../src/dataService.js";
const section = document.getElementById("movie-example")

let context;
function showDetails(id,ctx){
  ctx.showSection(section)
  displayMovie(id)
  context = ctx
// const controls = createControls(data)
// section.appendChild(detailsTemplate(data,controls))
// ctx.showSection(section)
// context = ctx
}

async function displayMovie(id){
  // const movie = await getMovieDetails(id)
  const user = userData.getUserData()
  const [movie,likes,ownLike] = await Promise.all([
    getMovieDetails(id),
    getLikesCount(id),
    specificUserLike(id,user)
  ])
  section.replaceChildren(detailsTemplate(movie,user,likes,ownLike))
  section.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click",onClickHandler)
  })
}
async function onClickHandler(event){
  event.preventDefault()
if (event.target.textContent === "Like") {
  const id = event.target.dataset.id
  const body = {
    movieId: id
  }
  await likeMovie(body)
  displayMovie(id)

}

  if (event.target.textContent === "Edit") {
    const id = event.target.dataset.id
    await editMovie(id,context)
  }
  if (event.target.textContent === "Delete") {
    const id = event.target.dataset.id
    await deleteMovie(id)
    await homeView(context)
  }

}
 function detailsTemplate(data,user,likes,ownLike){
    const div = document.createElement("div")
    div.classList.add("row.bg-light.text-dark")
    div.innerHTML = `
    <h1>Movie title: ${data.title}</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="${data.img}"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                ${data.description}
              </p>
              ${createControls(data,user,likes,ownLike)}
            </div>
          </div>
    `
    return div
}


function createControls(data,user,likes,ownLike){
debugger
    let controls = []
    const isOwner = user && user._id == movie._ownerId
    if (isOwner) {
      controls.push(`<a class="btn btn-danger"  data-id=${data._id} href="#">Delete</a>`)
      controls.push(`<a class="btn btn-warning"  data-id=${data._id}  href="#">Edit</a>`)      
    }  if (!isOwner && user && ownLike) {
      controls.push(`<span class="enrolled-span">Liked ${likes}</span>`)
    }if (!isOwner && user && !ownLike){
      controls.push(`<a class="btn btn-primary"  data-id=${data._id} href="#">Like</a>`)
    }
    
    return controls.join('')
}


export {
    showDetails,
}