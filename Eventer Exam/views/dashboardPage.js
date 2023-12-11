import { html } from "../node_modules/lit-html/lit-html.js"
import { getAllRecords } from "../services/dataService.js"
const dashboardTemplate = (data) => html`
  <h2>Current Events</h2>
        <section id="dashboard">
        
         ${data.length > 0 ? data.map((item) => recordCard(item)) : html`<h4>No Events yet.</h4>`}
         </section>
`
const recordCard = (item) => html`
 <div class="event">
            <img src="${item.imageUrl}" alt="example1" />
            <p class="title"> 
              ${item.name}
            </p>
            <p class="date">${item.date}</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
          </div>`

async function dashboardPage(ctx,next){
    const data = await getAllRecords()
    ctx.render(dashboardTemplate(data))
}

export {
    dashboardPage
}