import { html } from "../node_modules/lit-html/lit-html.js"
import { motorcycleDetails,editRecord } from "../services/dataService.js"
const editTemplate = (editData) => html`
 <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onSubmitHandler}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${editData.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${editData.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                .value=${editData.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${editData.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${editData.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
                .value=${editData.about}
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`
let context;
async function editPage(ctx,next){
    context = ctx
    const postId = context.params.id
    const editData = await motorcycleDetails(postId)    
    context.render(editTemplate(editData))
}

async function onSubmitHandler(event){
    event.preventDefault()
    console.log("edited")
    const postId = context.params.id
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
    if (model && imageUrl && year && mileage && contact && about) {
        await editRecord(postId,data)
        context.goTo(`/details/${postId}`)
    }
}
export{
    editPage
}