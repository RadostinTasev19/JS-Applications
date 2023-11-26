import { html, render } from "./node_modules/lit-html/lit-html.js"
const root = document.querySelector("body")

function renderer(template,container){
    render(template,container)
}
renderer(await generalTemp([]),root)

async function generalTemp(data){
    
    return html`
    <button id="loadBooks" @click="${onLoad}">LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="book-row">
${data ?.map(data => bookRowTemp(data))}
</tbody>
    </table>
    <section id="add-form">
${addForm()}
</section>
<section id="edit-form">
</section>
    `
}
function bookRowTemp(data){
    debugger
    return html `
    <tr>
                <td>${data.author}</td>
                <td>${data.title}</td>
                <td>
                    <button id="${data._id}" @click="${onEdit}">Edit</button>
                    <button id="${data._id}" @click="${onDelete}">Delete</button>
                </td>
            </tr>
    `
}
async function onLoad(){
    
    const response = await getAllBooks()// retrieves all data from the server
    
    const data = Object.values(response)
    
  renderer(await generalTemp(data),root)
    
}

async function getBook(id){
   const response =  await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
        method:"GET"
    })
    const data = await response.json()
    return data

}
async function getAllBooks(){
   const response =  await fetch("http://localhost:3030/jsonstore/collections/books",{
        method:"GET"
    })
    const data = await response.json()
    return data
}

function addForm (){
    return html `
    <form id="add-form" @submit="${onSubmit}">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input type="submit" value="Submit">
    </form>
    `
}
async function onSubmit(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const title = formData.get("title")
    const author = formData.get("author")
    const inputs = event.target.querySelectorAll("input[type=text]")
    const titleInput = inputs[0].value
    const authorInput = inputs[1].value
    if (titleInput !== "" && authorInput !== "") {
       const response =  await createBook(title,author)
       
       event.target.reset()
       await onSubmitBook(response)
    }
}
async function onSubmitBook(data){
    const container = document.getElementById("book-row")
    renderer(await bookRowTemp(data),container)
    // get the data and render the page
    
}
async function createBook(title,author){
    const response = await fetch ("http://localhost:3030/jsonstore/collections/books",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({title,author})
    })
    const data = await response.json()
    return data
}
function editForm(id,title,author){
    return html`
    <form id="edit-form" @submit="${onEditForm}">
        <input type="hidden" name="id" .value=${id}>
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title..." .value="${title}">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author..." .value="${author}">
        <input type="submit" value="Save">
    </form>
    `
}
function onEdit(event){

//get the information from the selected book and pass parameters to editForm
const id = event.target.id
const title = event.target.parentElement.parentElement.querySelectorAll("td")[0].textContent
const author = event.target.parentElement.parentElement.querySelectorAll("td")[1].textContent
const container = document.querySelector("section#edit-form")

renderer(editForm(id,title,author),container)
}
async function onDelete(event){
debugger
const id = event.target.id
await deleteResource(id)
debugger
await updateData()

}
async function updateData(){
    const data = await getAllBooks()
    const values = Object.values(data)
    renderer(await generalTemp(values),root)
}
async function deleteResource(id){
    await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
        method:"DELETE"
    })
}
async function onEditForm(event){
    event.preventDefault()
    
    const formData = new FormData(event.target)
    const title = formData.get("title")
    const author = formData.get("author")
    const id = event.target.querySelector("input").value
      const response = await modifyBook(title,author,id)
      
      
       const data = await getBook(id)
       const container = document.getElementById("book-row")
       renderer(await bookRowTemp(data),container)

}

async function modifyBook(title,author,id){
    const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({title,author})
    })
    const data = await response.json()
    return data
}
