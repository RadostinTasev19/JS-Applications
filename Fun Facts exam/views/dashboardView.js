import { html,render } from "../node_modules/lit-html/lit-html.js"
import { funFactsData } from "../src/userService.js"
const root = document.getElementById("root")

const dashboardTemplate = (data) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
         ${data ? data.map((data)=> factTemp(data)) : ""}
        </section>
         ${!data ? html`<h2>No Fun Facts yet.</h2>` : ""}
        

`
const factTemp = (data) => html`
<div class="fact">
            <img src="${data.imageUrl}" alt="example1" />
            <h3 class="category">History</h3>
            <p class="description">${data.description}</p>
            <a class="details-btn" href="/details/${data._id}">More Info</a>
          </div>
`
export async function dashboardView(){
    const data = await funFactsData()
    
    render(dashboardTemplate(data),root)
    }