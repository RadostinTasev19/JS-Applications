import { html,render } from "../node_modules/lit-html/lit-html.js"
import { createFact } from "../src/userService.js"
const root = document.querySelector("main#root")
const createFactTemplate = ()=> html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit="${onSubmitHandler}">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image_url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional_info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`
async function onSubmitHandler(event){
    event.preventDefault()
    const data = new FormData(event.target)
    const {category,image_url,description,additional_info} = Object.fromEntries(data)
    const formData = {
        category,
        image_url,
        description,
        additional_info
    }
    if (category && image_url && description && additional_info) {
        await createFact(formData)
    }
}
export function addFact(){
    render(createFactTemplate(),root)
}
