import { html,render } from "../node_modules/lit-html/lit-html.js"
import { funFactDetails } from "../src/userService.js"
import { userData } from "../src/userHelper.js"
import { likeFact ,getTotalLikes,getSpecificLikes} from "../src/userService.js"
const root = document.getElementById("root")

const detailsTemplate = (
  data,
  isOwner,
  user_Id,
  id,
  totalLikesCount
  ) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-category">History</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${data.description}
                  </p>
                   <p id ="more-info">
                    ${data.moreInfo}
                        </p>
              </div>

              <h3>Likes:<span id="likes">${totalLikesCount}</span></h3>        
          <div id="action-buttons">
          ${isOwner ? actionBtns(data) : "" }
          ${user_Id ? html`<a href="javascript:void(0)"  id="${id}" @click=${onLikeHandler}>Like</a>` : ""}
          </div>
            </div>
        </div>
      </section>
`
const actionBtns = (data) => html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="/delete/${data._id}" id="delete-btn">Delete</a>`

export async function detailsView(ctx){
  
  let userId;
  let totalLikesCount;
  let didUserLiked;
    const id = ctx.params.id // get the id of the article on which the user has clicked
    const data = await funFactDetails(id)
    const user = userData.getUserData() !== null ? true : false
    if (user) {
      userId = userData.getUserData()._id
      didUserLiked = await getSpecificLikes(id,userId)
    }
    const user_Id = userData.getUserData() ? userData.getUserData()._id : ""
    const isOwner = userId === data._ownerId
    totalLikesCount = await getTotalLikes(id) 
    render(
      detailsTemplate
      (
        data,
        isOwner,
        user_Id,
        id,
        totalLikesCount
        ),
        root)
}

async function onLikeHandler(event){
const id = event.target.id
const factId = {
  fId: id
}
const userId = userData.getUserData()._id
await likeFact(factId)//send post request with the post id to the server

//const totalLikesCount =  // get total likes of the post
// const userLikesCount = await getSpecificLikes(id,userId) // get total likes of specific user for the current post
// console.log(totalLikesCount)
// console.log(userLikesCount)
}
