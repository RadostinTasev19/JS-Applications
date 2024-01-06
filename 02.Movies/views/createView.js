import {createMovie} from "../src/dataService.js"
const addTemplate = document.getElementById("add-movie")
addTemplate.addEventListener("submit",onSubmitHandler)
let context;
function addMovie(ctx){
ctx.showSection(addTemplate)
context = ctx
}

async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const title = formData.get("title")
    const description = formData.get("description")
    const img = formData.get("img")

    const data = {
        title,
        description,
        img
    }

    if (title && description && img) {
        await createMovie(data)
        context.goTo("/")
    }
    event.target.reset()

}
export {
    addMovie
}