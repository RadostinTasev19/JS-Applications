import {html, render } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../../src/api.js"
import { userData } from "../../src/authentication.js"
import { updateNav } from "../../src/app.js"
import  page  from "/node_modules/page/page.mjs"
const root = document.querySelector("div.container")
const loginTemp = () => {
    return html `
    <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit="${onLogin}">
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
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
    </div>`
}
export function loginView(){
    render(loginTemp(),root)
}

function onLogin(event){
event.preventDefault()
const formData = new FormData(event.target)
const email = formData.get("email")

const password = formData.get("password")
if (email && password) {
    const url = "/users/login"
    userData.setUserData({email,password})
    post(url,{email,password})
    updateNav()
    page.redirect("/dashboard")
}

}