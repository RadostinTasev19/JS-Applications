import { html,render } from "../node_modules/lit-html/lit-html.js"
import { userData } from "../src/userHelper.js"

const root = document.querySelector("section#root")
const homeTemp = (data,user) => html`
                <article class="hero layout">
                    <img src="./assets/team.png" class="left-col pad-med">
                    <div class="pad-med tm-hero-col">
                        <h2>Welcome to Team Manager!</h2>
                        <p>Want to organize your peers? Create and manage a team for free.</p>
                        <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                    </div>
                </article>
                ${user ? browseTeams() : signUp()}
`


const signUp = () => html`
<div id="signUp">
                        <a href="/register"  class="action cta">Sign Up Now</a>
                        </div>
`
const browseTeams = () => html`
<div id="browseTeams">
                        <a href="/browse"  class="action cta">Browse Teams</a>
                        </div>
`
export function homeView(){
    const user = userData.getUserData() 
    render(homeTemp([],!!user),root)
    
}