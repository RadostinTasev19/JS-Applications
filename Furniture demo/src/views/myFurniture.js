import {html, render } from "../../node_modules/lit-html/lit-html.js"
import { userData } from "../authentication.js"
import { get } from "../../src/api.js"
const root = document.querySelector(".container")
const myFurnitureTemp = (data) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        ${data.map((item)=> cardTemplate(item))}
        
`

const cardTemplate = (item) => html`
<div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                            <img src=${item.img} />
                            <p>${item.description}</p>
                            <footer>
                                <p>Price: <span>${item.price} $</span></p>
                            </footer>
                            <div>
                                <a href="/details/${item._id}" class="btn btn-info">Details</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>`
        export async function myFurniture(){
            const userID = userData.getUserId();
           const data = await get(`/data/catalog?where=_ownerId%3D%22${userID}%22`)
           debugger
           render(myFurnitureTemp(data),root)

        }