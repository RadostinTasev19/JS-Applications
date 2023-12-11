import { html } from "../node_modules/lit-html/lit-html.js"
import { createAdd } from "../services/dataService.js";
const createTemplate = () => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`
let context;
async function createPage(ctx,next){
    context = ctx
    context.render(createTemplate())
}

async function onSubmitHandler(event){
    event.preventDefault()
const formData = new FormData(event.target)
const name = formData.get("name")
const imageUrl = formData.get("imageUrl")
const category = formData.get("category")
const description = formData.get("description")
const date = formData.get("date")
const data = {
    name,
    imageUrl,
    category,
    description,
    date
}
if (name && imageUrl && category && description && date) {
    await createAdd(data)
    context.goTo("/dashboard")
}

}
export {
    createPage
}