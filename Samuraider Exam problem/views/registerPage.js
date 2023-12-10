import { html } from "../node_modules/lit-html/lit-html.js"
import { registerUser } from "../services/userService.js"
const registerTemplate = () => html`
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
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`
let context;
function registerPage(ctx,next){
  context = ctx
    context.render(registerTemplate())
    
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
        const response = await registerUser(data)
      context.userData.setUserData(response)
      context.updateNav()
      context.goTo("/")
    }else{
      window.alert("error")
    }
}
export { 
  registerPage
}