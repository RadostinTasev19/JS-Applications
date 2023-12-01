import { html,render } from "/node_modules/lit-html/lit-html.js";
import { post } from "../src/api.js"
import page from "/node_modules/page/page.mjs"
import { userData } from "../src/userHelper.js";
import { updateNav } from "../src/app.js";
const registerTemp = (error) => html`
<article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" @submit="${onSubmitHandler}" class="main-form pad-large">
                       ${error ? errorTemp() : ""}
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
                    </footer>
                </article>
`
const root = document.querySelector("section#root")
export function registerView(){
    render(registerTemp(),root)
}
const errorTemp = () => html`
 <div class="error">Error message.</div>
`
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const {email,username,password,repass} = Object.fromEntries(formData)
const data = {
    email,
    username,
    password,
    repass
}
    const error = {}
    let hasError = false
    const pattern = /[A-Za-z0-9]+[\@][a-z]+.[a-z]+/g
    const validEmail = pattern.test(email)
    if (!validEmail) {
        error.email = true
        hasError = true
    }
    if (username.length < 3) {
        error.username = true
        hasError = true
    }
    if (password === repass && password.length < 3) {
        error.password = true
        hasError = true
    }
    if (hasError) {
        render(registerTemp(error),root)
    }
    render(registerTemp(data),root)   
    const response = await post("/users/register",data)
    userData["setUserData"](response)
    updateNav()
    page.redirect("/myTeams")
}