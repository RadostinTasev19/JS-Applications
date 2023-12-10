import { html,render } from "../node_modules/lit-html/lit-html.js"
import { createRecord } from "../src/userService.js"
const createRecordTemp = () => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`
let context
export async function createPage(ctx,next){
    ctx.render(createRecordTemp())
    context = ctx
    next()
}
async function onSubmitHandler(event){
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
        await createRecord(data)
        context.goTo("/dashboard")
    }
}