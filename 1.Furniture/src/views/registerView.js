import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../api.js"
import { userData } from "../../src/authentication.js"
import { updateNav } from "../../src/app.js"
import  page  from "../../node_modules/page/page.mjs"
const root = document.querySelector("div.container")
const registerTemp = () => html
`
    <div class="row space-top">
               <div class="col-md-12">
                   <h1>Register New User</h1>
                   <p>Please fill all fields.</p>
               </div>
           </div>
           <form @submit="${registerNewUser}">
               <div class="row space-top">
                   <div class="col-md-4">
                       <div class="form-group">
                           <label class="form-control-label" for="email">Email</label>
                           <input class="form-control" id="email" type="text" name="email">
                       </div>
                       <div class="form-group">
                           <label class="form-control-label" for="password">Password</label>
                           <input class="form-control" id="password" type="password" name="password">
                       </div>
                       <div class="form-group">
                           <label class="form-control-label" for="rePass">Repeat</label>
                           <input class="form-control" id="rePass" type="password" name="rePass">
                       </div>
                       <input type="submit" class="btn btn-primary" value="Register" />
                   </div>
               </div>
           </form>
   `
export function registerView(){
    render(registerTemp(),root)
}
async function registerNewUser(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const repass = formData.get("rePass")
    if (email && password && repass && password === repass) {
        const url = "/users/register"
       const response =  await post(url,{email,password})
        userData["setUserData"] (response)
    }
    event.target.reset()
    debugger
    updateNav()
    page.redirect("/")
}
