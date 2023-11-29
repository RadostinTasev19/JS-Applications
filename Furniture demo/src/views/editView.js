import {html, render } from "../../node_modules/lit-html/lit-html.js"
import { get,put } from "../../src/api.js"
import  page  from "/node_modules/page/page.mjs"

const container = document.querySelector(".container")
let id = ""
export async function editView(ctx){
//get the data from the server for the particular furniture
id = ctx.params.id

const data = await get(`/data/catalog/${id}`)
render(editTemp(data),container)
}
const editTemp = (data,error) =>
html`
  <div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit="${submitHandler}">
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class="form-control ${!!error && error.make ? "is-invalid" : "valid"}" id="new-make" type="text" name="make" value="${data.make}">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control ${!!error && error.model ? "is-invalid" : "valid"}" id="new-model" type="text" name="model" value="${data.model}">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control ${!!error && error.year ? "is-invalid" : "valid"}" id="new-year" type="number" name="year" value="${data.year}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control ${!!error && error.description ? "is-invalid" : "valid"}" id="new-description" type="text" name="description" value="${data.description}">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control ${!!error && error.price ? "is-invalid" : "valid"}" id="new-price" type="number" name="price" value="${data.price}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control ${!!error && error.img ? "is-invalid" : "valid"}" id="new-image" type="text" name="img" value="${data.img}">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control ${!!error && error.material ? "is-invalid" : "valid"}" id="new-material" type="text" name="material" value="${data.material}">
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>`
async function submitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const {make,model,year,description,price,img,material} = Object.fromEntries(formData)
    const error = {}
    const hasError = false
    if (make.length < 4) {
        error.make = true
        hasError = true
    }
    if (model.length < 4) {
        error.model = true
        hasError = true
    }
    if (Number(year) < 1950 && Number(year) > 2050) {
        error.year = true
        hasError = true
    }
    if (description.length < 10) {
        error.description = true
        hasError = true
    }
    if (Number(price) < 0) {
        error.price = true
        hasError = true
    }
    if (!img) {
        error.img = true
        hasError = true
    }

    const data = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    }
    if (hasError) {
        render(editTemp(data,error),container)
    }
await put(`/data/catalog/${id}`,data)
page.redirect("/")

}