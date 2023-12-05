import { html,render } from "../node_modules/lit-html/lit-html.js"
import {  register } from "../src/userService.js"
const root = document.querySelector("main#root")
const registerTemp = () => html`
 <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onSubmitHandler}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re_password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`
async function onSubmitHandler(event){
    event.preventDefault()
const data = new FormData(event.target)

const {email,password,re_password} = Object.fromEntries(data)
const formData = {
    email,
    password,
    re_password
}
await register(formData)

}
export function registerView(){
    render(registerTemp(),root)
}