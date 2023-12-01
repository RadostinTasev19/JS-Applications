import { html,render } from "../node_modules/lit-html/lit-html.js"
const editTemp = () => html`
<article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" class="main-form pad-large">
                        <div class="error">Error message.</div>
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
`
const root = document.querySelector("section#root")
export function editView(){
render(editTemp(),root)
}