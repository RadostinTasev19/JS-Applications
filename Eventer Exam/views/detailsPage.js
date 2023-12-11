import { html } from "../node_modules/lit-html/lit-html.js"
import { getDetails,deleteRecord } from "../services/dataService.js"
import {  eventRequest,totalGoing,numGoingsUser } from "../services/goingService.js"

const detailsTemplate = (data,user,isOwner,totalPeopleForEvent,userIsGoing,onDelete,onGoing) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1" />
            <p id="details-title">${data.name}</p>
            <p id="details-category">
              Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${data.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>
                 ${data.description}
                </span>
              </div>

            </div>

            <h3>Going: <span id="go">${totalPeopleForEvent}</span> times.</h3>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${isOwner ? html`
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="" id="delete-btn" @click=${onDelete}>Delete</a>`
                        :
                        ""
                    }

              <!--Bonus - Only for logged-in users ( not authors )-->
              ${!isOwner && user !== null  && userIsGoing === 0 ? html`<a href="" id="go-btn" @click=${onGoing}>Going</a>` : ""}
              
            </div>
          </div>
        </section>
`

async function detailsPage(ctx,render){
  let context;
  let isOwner;
  let userId;
  let totalPeopleForEvent;
  let postId
  let userIsGoing;
  let data;
  let user;
  context = ctx
  
  postId = context.params.id
  data = await getDetails(postId)
  user = context.userData.getUserData()
  userId = context.userId()
  isOwner = userId === data._ownerId
  totalPeopleForEvent = await totalGoing(postId)
  userIsGoing = await numGoingsUser(postId,userId)
  debugger
  context.render(detailsTemplate(data,user,isOwner,totalPeopleForEvent,userIsGoing,onDelete,onGoing))

async function onDelete(event){
  const doesConfirm = confirm("Do you want to delete this event?")
  const postId = context.params.id
  if (doesConfirm) {
    await deleteRecord(postId)
    context.goTo("/dashboard")
  }
}
async function onGoing(event){
const body = {
  postId
}
await eventRequest(body)
totalPeopleForEvent = await totalGoing(postId)
userIsGoing = await numGoingsUser(postId,userId)
context.render(detailsTemplate(data,user,isOwner,totalPeopleForEvent,userIsGoing,onDelete,onGoing))
}
}
export {
    detailsPage
}


































// const detailsTemplate = (data,isOwner,isGuest, totalGoesCount,didUserJoin) => html`
// <section id="details">
//           <div id="details-wrapper">
//             <img id="details-img" src="${data.imageUrl}" alt="example1" />
//             <p id="details-title">${data.title}</p>
//             <p id="details-category">
//               Category: <span id="categories">${data.category}</span>
//             </p>
//             <p id="details-date">
//               Date:<span id="date">${data.date}</span></p>
//             <div id="info-wrapper">
//               <div id="details-description">
//                 <span>
//                     ${data.description}
//                 </span>
//               </div>

//             </div>

//             <h3>Going: <span id="go">${totalGoesCount}</span> times.</h3>

//             <!--Edit and Delete are only for creator-->
//             <div id="action-buttons">
//                 ${isOwner ? html`
//               <a href="/edit/${data._id}" id="edit-btn">Edit</a>
//               <a href="" id="delete-btn" @click=${onDelete}>Delete</a>`
//                               :
//                               ""                      }
//               <!--Bonus - Only for logged-in users ( not authors )-->
//               ${didUserJoin === 0 && !isGuest && !isOwner ? html`<a href="javascript:void(0)" @click=${onGoing} id="go-btn">Going</a>` : ""}
//             </div>
//           </div>
//         </section>
// `
// /*
// ${!isOwner && !isGuest ? }
// */
// let context;
// let totalGoesCount;
// let didUserJoin;
// let isOwner;
// let isGuest;
// async function detailsPage(ctx,next){
//     context = ctx
//     const postId = context.params.id
//     const data = await getDetails(postId)//get details for single event
//     const userId = ctx.userId()
//     if (userId !== undefined) {
//         context.userId = userId
//         didUserJoin = await numGoingsUser(postId,userId)//request to get the number of the goings for a event for specific user
//         isOwner = userId === data._ownerId
//     }
     
//      isGuest = userId === null
//      totalGoesCount = await totalGoing(postId)//request to get total going count for an event

//     context.render(
//         detailsTemplate
//         (
//             data,
//             isOwner,
//             isGuest,
//             totalGoesCount,
//             didUserJoin
//             )
//         )
// }

// async function onDelete(event){
//     const postId = context.params.id
//     const doesConfirm = confirm("Do you want to delete this resource?")
//     if (doesConfirm) {
//         await deleteRecord(postId)
//         context.goTo("/dashboard")
//     }
    
// }

// async function onGoing(event){
// const eventId = context.params.id
// const data = await getDetails(eventId)
// const userId = context.userId
// const body = {
//     eventId
// }
// await eventRequest(body)// request to add people to the event:
// totalGoesCount = await totalGoing(eventId)//request to get total going count for an event
// didUserJoin = await numGoingsUser(eventId,userId)//request to get the number of the goings for a event for specific user
// context.render(
//     detailsTemplate(
//         data,
//         isOwner,
//         isGuest,
//         totalGoesCount,
//         didUserJoin
//     )
// )
// }
// export {
//     detailsPage
// }