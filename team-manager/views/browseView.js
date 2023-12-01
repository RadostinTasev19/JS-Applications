import { html,render } from "../node_modules/lit-html/lit-html.js"
import { get } from "/src/api.js"
import { userData } from "../src/userHelper.js"
import { dataService } from "../src/dataService.js"
const browseTemp = (data,user) => html`
                <article class="pad-med">
                    <h1>Team Browser</h1>
                </article>
                ${user ? createTeamBtn() : ""}
                
`              
const teamTemp = (data) => html`
<article class="layout">
                    <img src="${data.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">5000 Members</span>
                        <div><a href="/detailsView/${data._id}" class="action">See details</a></div>
                    </div>
                </article>
`
function createTeamBtn(){
    return html`
     <article class="layout narrow">
     <div class="pad-small" >
                        <a href="#"   class="action cta">Create Team</a>
                    </div>
                    </article>
    
    `
}
const root = document.querySelector("section#root")
export async function browseView(){
    debugger
    const user = userData.getUserData()
    const allTeamsData = await dataService.allTeams()//returns a response object containg data from the request to the particular endpoint
    debugger
    render(browseTemp(allTeamsData,!!user),root)
}
