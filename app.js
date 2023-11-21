// first we get our root element in which we will write our HTML
import { contacts } from "./contacts.js"
import { appTemplate } from "./templates/appTemplate.js"

const root = document.getElementById("contacts")
function render(html,parentElement){
    const div = document.createElement("div")
    div.classList.add("contact-card")
    div.innerHTML = html
    parentElement.replaceChildren(div)
}
contacts.forEach((contact) => {
    debugger
render(appTemplate(contact),root)
});
