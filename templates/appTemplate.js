import { html } from "../node_modules/lit-html/lit-html.js"
export const appTemplate = (contact) => {
    debugger
    return html`
       <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name:${contact.name}</h2>
                <button class="detailsBtn" onclick="showDetails(1)">Details</button>
                <div class="details" id="${contact.id}">
                    <p>Phone number:${contact.phoneNumber}</p>
                    <p>Email:${contact.email}</p>
                </div>
            </div>`
}
