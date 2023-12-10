import { html } from "../node_modules/lit-html/lit-html.js"
import { motorcycleDetails,deletePost } from "../services/dataService.js"
import { userId } from "../src/userHelper.js"
const detailsTemplate = (data,isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.title}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">Year: ${data.year}</p>
                <p class="mileage">Mileage: ${data.mileage} km.</p>
                <p class="contact">Contact Number: ${data.number}</p>
                   <p id = "motorcycle-description">
                   ${data.about}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
           ${isOwner ? actionBtns(data) : ""}
          </div>
            </div>
        </div>
      </section>
`
const actionBtns = (data) => html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
`
let context;
async function detailsPage(ctx,next){
    context = ctx
    const postId = context.params.id
    const data = await motorcycleDetails(postId)
    const isOwner = userId() === data._ownerId
    context.render(detailsTemplate(data,isOwner))
}


async function onDelete(event){
const postId = context.params.id
const doesConfirm = confirm("Are you sure you want to delete this resource?")
if (doesConfirm) {
    await deletePost(postId)
    context.goTo("/dashboard")
}

}

export {
    detailsPage
}