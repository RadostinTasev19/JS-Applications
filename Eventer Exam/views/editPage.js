import { html } from "../node_modules/lit-html/lit-html.js"
import { getDetails,editEvent } from "../services/dataService.js"
const editTemplate = (data) => html`
  <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                .value=${data.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                .value=${data.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                .value=${data.category}
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
                .value=${data.description}
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              .value=${data.date}
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

let context;
async function editPage(ctx,next){
    context = ctx
    const postId = ctx.params.id
    const data = await getDetails(postId)
    context.render(editTemplate(data))
}

async function onSubmitHandler(event){
    event.preventDefault()
    debugger
    const postId = context.params.id
    const formData = new FormData(event.target)
    const name = formData.get("name").trim()
    const imageUrl = formData.get("imageUrl").trim()
    const category = formData.get("category").trim()
    const description = formData.get("description").trim()
    const date = formData.get("date").trim()
    const body = {
        name,
        imageUrl,
        category,
        description,
        date
    }
    if (name && imageUrl && category && description && date) {
        await editEvent(postId,body)
        event.target.reset() //clear any input data from the
        context.goTo(`/details/${postId}`)
    }else{
      return alert("All fields are required!")
    }
}
export {
    editPage
}