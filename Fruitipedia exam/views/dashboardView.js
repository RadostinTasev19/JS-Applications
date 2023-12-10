import { html,render } from "../node_modules/lit-html/lit-html.js"
import { allRecords } from "../src/userService.js"
const dashboardTemplate = (data) => html`
<h2>Fruits</h2>
<section id="dashboard">
${data? data.map((item) => fruitTemplate(item)) : "" }
</section>
${data.length === 0 ? html`<h2>No fruit info yet.</h2>` : ""}
`
const fruitTemplate = (item)=> html`
<div class="fruit">
            <img src="${item.imageUrl}" />
            <h3 class="title">${item.name}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>
`
export async function dashboardPage(ctx,next){
    const data = await allRecords() 
    ctx.render(dashboardTemplate(data))
    next()
}