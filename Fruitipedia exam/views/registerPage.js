import { html,render } from "../node_modules/lit-html/lit-html.js"
import { registerUser } from "../src/userService.js"
const registerForm = ()=> html`
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
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`
let context;
export function registerPage(ctx,next){
    ctx.render(registerForm())
    context = ctx
    next()
}
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const rePass = formData.get("re-password")
    
    const data = {
        email,
        password
    }
    if (email && password && password === rePass) {
        await registerUser(data)
        context.updateNav()
        context.goTo("/")
    }else{
        window.alert("error")
    }
}