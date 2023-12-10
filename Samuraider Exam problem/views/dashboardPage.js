import { html, nothing } from "../node_modules/lit-html/lit-html.js"
import { listAllRecords } from "../services/dataService.js"

const dashboardTemplate = (data) => html`
 <h2>Available Motorcycles</h2>
        <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${data.length > 0 ? data.map((item) => motoCard(item)) : ""}
          </section>
         <!-- Display an h2 if there are no posts -->
         ${data.length === 0 ? html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>` : nothing}
`
const motoCard = (item) => html`
<div class="motorcycle">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.model}</h3>
            <p class="year">Year: ${item.year}</p>
            <p class="mileage">Mileage: ${item.mileage} km.</p>
            <p class="contact">Contact Number: ${item.number}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>
`
const root = document.querySelector("main#root")
async function dashboardPage(ctx,next){
    const data = await listAllRecords()// returns all records from the database
    ctx.render(dashboardTemplate(data))
}
export { 
    dashboardPage
}