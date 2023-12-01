import { html,render } from "../node_modules/lit-html/lit-html.js"
import { post } from "../src/api.js"
import { userData } from "../src/userHelper.js"
import { updateNav } from "../src/app.js"
import  page  from "/node_modules/page/page.mjs"
const loginTemp = (error) => html`
<article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" @submit="${onSubmitHandler}" class="main-form pad-large">
                        <div class="error" style=${!error ? "display:none" : "display:block"}>Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
                    </footer>
                </article>
`
export function loginView(){
    render(loginTemp(),root)
    }
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const {email,password} = Object.fromEntries(formData)
    const data = {
        email,
        password
    }

    const error = {}
    let hasError = false
    const pattern = /[A-Za-z0-9]+[\@][a-z]+.[a-z]+/g
    const validEmail = pattern.test(email)
    if (!validEmail) {
        error.email = true
        hasError = true
    }
    if (password.length < 3) {
        error.password = true
        hasError = true
    }
    if (hasError) {
        render(registerTemp(error),root)
    }else{
        const response =  await post("/users/login",data)
       userData["setUserData"](response)
       updateNav()
        page.redirect("/myTeams")
    }   
}
const root = document.querySelector("section#root")
