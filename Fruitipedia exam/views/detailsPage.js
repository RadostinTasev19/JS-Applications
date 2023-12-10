import { fruitDetails,deleteFruit } from "../src/userService.js"
import { html,render } from "../node_modules/lit-html/lit-html.js"
const detailsTemplate = (data,isOwner) => html`
<section id="details">
<div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>
                  ${data.description}
                  </p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">
                     ${data.nutrition}
                        </p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${isOwner  ? 
           actionButtons(data)
            :
            ""
        }
            
          </div>
            </div>
        </div>
      </section>
`
const actionButtons = (data) =>  html
`
<a href="/edit/${data._id}" id="edit-btn">Edit</a>
<a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
`
let context;
export async function detailsPage(ctx,next){
context = ctx
const id = context.params.id
const data = await fruitDetails(id)

const user = context.userData.getUserData()
console.log(user)
const isOwner = user._id === data._ownerId
console.log(isOwner)
context.render(detailsTemplate(data,isOwner))
next()

}
async function onDelete(event){
    event.preventDefault()
    const id = context.params.id
    const userConfirm = confirm("Delete this post?")
    if (userConfirm) {
        await deleteFruit(id)
        context.goTo("/dashboard")
    }

}