import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { get,del } from "../../src/api.js"
import { userData } from "../authentication.js"
import  page  from "/node_modules/page/page.mjs"
const detailsTemplate = (data,isOwner) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="../${data.img}"/>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${data.make}</span></p>
                <p>Model: <span>${data.model}</span></p>
                <p>Year: <span>${data.year}</span></p>
                <p>Description: <span>${data.description}</span></p>
                <p>Price: <span>"${data.price} $"</span></p>
                <p>Material: <span>${data.material}</span></p>
                <div>
                    ${isOwner ? html`
                    <a href=/edit/${data._id} class="btn btn-info">Edit</a>
                    <a href="javascript:void(0)" @click=${onDelete} class="btn btn-red">Delete</a>
                    ` : ""
                }    
                </div>
            </div>
        </div>
`
//javascript:void(0) - we create a link that does nothing

let id = ""
export async function detailsView(context){
    //http://localhost:3030/data/catalog/:id
    id = context.params.id
    const data = await get(`/data/catalog/${id}`)
    const isOwner = userData.getUserId() === data._ownerId
    //we get the user id from session storage and compare it to the owner ID of the product
    const container = document.querySelector("div.container")
    render(detailsTemplate(data,isOwner),container)
}
async function onDelete(event){
    
   await del(`/data/catalog/${id}`)
   page.redirect("/")
}


