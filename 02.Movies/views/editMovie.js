import {updateMovie} from "../src/dataService.js"
import { getMovieDetails } from "../src/dataService.js"
import { showDetails } from "./detailsView.js";
const section = document.getElementById("edit-movie")


let dataId;
let context
async function editMovie(id,ctx){
section.replaceChildren()
const data = await getMovieDetails(id)
const template = editFormTemp(data)
template.addEventListener("submit",onSubmitHandler)
section.appendChild(template)
ctx.showSection(section)
dataId = id
context = ctx
}
async function onSubmitHandler(event){
    event.preventDefault()
    debugger
    const formData = new FormData(event.target)
    const title = formData.get("title")
    const description = formData.get("description")
    const img = formData.get("img")
    
const body = {
    title,
    description,
    img
}

    if (title && description && img) {
       const data =  await updateMovie(dataId,body)
        showDetails(dataId,context,data)
    }
}

const editFormTemp = (data) => {
    const form = document.createElement("form")
    form.classList.add("text-center.border.border-light.p-5")
    form.action = "#"
    form.method = ""
    form.innerHTML = `
    <form class="text-center border border-light p-5" action="#" method="">
    <h1>Edit Movie</h1>
    <div class="form-group">
      <label for="title">Movie Title</label>
      <input
        id="title"
        type="text"
        class="form-control"
        placeholder="Movie Title"
        value="${data.title}"
        name="title"
      />
    </div>
    <div class="form-group">
      <label for="description">Movie Description</label>
      <textarea
        class="form-control"
        placeholder="Movie Description..."
        value=${data.description}
        name="description"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="imageUrl">Image url</label>
      <input
        id="imageUrl"
        type="text"
        class="form-control"
        placeholder="Image Url"
        value="${data.img}"
        name="img"
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
    `
    return form
}
export {
    editMovie
}