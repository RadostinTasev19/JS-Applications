import { html,render } from "../node_modules/lit-html/lit-html.js"
import {editFruit,fruitDetails} from "../src/userService.js"

const editTemplate = (data)=> html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${data.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${data.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${data.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`
export async function onSubmitHandler(event){
    event.preventDefault()
const formData = new FormData(event.target)
const name = formData.get("name")
const imageUrl = formData.get("imageUrl")
const description = formData.get("description")
const nutrition = formData.get("nutrition")
const data = {
    name,
    imageUrl,
    description,
    nutrition
}
if (name && imageUrl && description && nutrition) {
    const id = context.params.id
    await editFruit(id,data)
    context.goTo(`/details/${id}`)
}

}

let context;
export async function editPage(ctx,next){
context = ctx
const id = context.params.id
const data = await fruitDetails(id)
debugger
context.render(editTemplate(data))
next()
}