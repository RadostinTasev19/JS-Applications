import { html } from "../node_modules/lit-html/lit-html.js"
import { createRecord } from "../services/dataService.js"
const createTemplate = () => html`
<section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>
`
let context;
async function createPage(ctx,next){
    context = ctx
    context.render(createTemplate())
}
async function onSubmitHandler(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const model = formData.get("model")
    const imageUrl = formData.get("imageUrl")
    const year = formData.get("year")
    const mileage = formData.get("mileage")
    const contact = formData.get("contact")
    const about = formData.get("about")
    const data = {
        model,
        imageUrl,
        year,
        mileage,
        contact,
        about
    }
    if (model && imageUrl && year && mileage  && contact && about) {
        await createRecord(data)
        context.goTo("/dashboard")
    }
}
export {
    createPage
}