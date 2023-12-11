import { html } from "../node_modules/lit-html/lit-html.js"
import { login } from "../services/userService.js"

const logintTemplate = () => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form class="login-form" @submit=${onSubmitHandler}>
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
let context;
async function loginPage(ctx,next){
    context = ctx
context.render(logintTemplate())
}

async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)

    const email = formData.get("email")
    const password = formData.get("password")
    const data = {
        email,
        password
    }
    if (email && password) {
        const response = await login(data)
        context.userData.setUserData(response)
        context.updateNav()
        context.goTo("/")
    }else{
        window.alert("error")
    }
}

export{
    loginPage
}   