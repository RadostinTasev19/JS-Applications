import { login } from "../src/userService.js"
import { html,render } from "../node_modules/lit-html/lit-html.js"
const root = document.getElementById("root")
const loginForm = () => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit="${onSubmitHandler}">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const { email,password } = Object.fromEntries(formData)
    const data = {
        email,
        password
    }
    if (email && password) {
         await login(data)
    }else{
        throw new Error("error")
        window.alert("error")
    }
   

}
export  function loginView(){
    render(loginForm(),root)

}