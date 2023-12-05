import { html,render } from "../node_modules/lit-html/lit-html.js"
import { funFactDetails } from "../src/userService.js"
import { editFact } from "../src/userService.js"
const editTemplate = (data,id) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit="${onSubmitHandler}" id="${id}">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${data.category}
            />
            <input
              type="text"
              name="image_url"
              id="image-url"
              placeholder="Image URL"
              .value=${data.image_url}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${data.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional_info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${data.additional_info}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`
const root = document.querySelector("main#root")
export async function edit(ctx){
    const id = ctx.params.id
    debugger
const data = await funFactDetails(id)
render(editTemplate(data,id),root)
}
async function onSubmitHandler(event){
    event.preventDefault()
    const id = event.target.id
const data = new FormData(event.target)
const {category,image_url,description,additional_info} =  Object.fromEntries(data)
const formData = {
    category,
    image_url,
    description,
    additional_info
}
if (category && image_url && description && additional_info) {
    await editFact(id,formData)
}

}
