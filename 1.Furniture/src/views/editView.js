import { html, render } from "../../node_modules/lit-html/lit-html.js"
import  page  from "/node_modules/page/page.mjs"
import { get,put } from "../../src/api.js"
const root = document.querySelector(".container")
const editTemplate = (data,error) => html`
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
                        <label class="form-control-label" for="new-make">${data.make}</label>
                        <input class="form-control ${!!error && error.make ? "is-invalid" : "is-valid"}" id="new-make" type="text" name="make" value="Table">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">${data.model}</label>
                        <input class="form-control ${!!error && error.model ? "is-invalid" : "is-valid"}" id="new-model" type="text" name="model" value="Swedish">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">${data.year}</label>
                        <input class="form-control ${!!error && error.year ? "is-invalid" : "is-valid"}" id="new-year" type="number" name="year" value="2015">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">${data.description}</label>
                        <input class="form-control ${!!error && error.description ? "is-invalid" : "is-valid"}" id="new-description" type="text" name="description" value="Medium table">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">${data.price}</label>
                        <input class="form-control ${!!error && error.price ? "is-invalid" : "is-valid"}" id="new-price" type="number" name="price" value="235">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">${data.image}</label>
                        <input class="form-control ${!!error && error.img ? "is-invalid" : "is-valid"}" id="new-image" type="text" name="img" value="/images/table.png">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">${data.material} (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="Wood">
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`
let id = ""
export async function editView(ctx) {
    //when the edit button is clicked, the element id is sent as endpoint in the URL
     id = ctx.params.id
     debugger
    const data = await get(`/data/catalog/${id}`)
    debugger
     render(editTemplate(data),root)
}

async function submitHandler(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const { make, model, year, description, price, img, material } = Object.fromEntries(formData)
    const error = {}
    let hasError = false
    if (make.length < 4) {
        error.make = true
        hasError = true
    }
    if (model.length < 4) {
        error.model = true
        hasError = true
    }
    if (year < 1950 && year > 2050) {
        error.year = true
        hasError = true
    }
    if (description.length < 10) {
        error.description
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
        img
    }
    if (hasError) {
        return render(editTemplate(data,error), root)
    }
    await put(`data/catalog/${id}`,data)
    page.redirect("/dashboard")
}