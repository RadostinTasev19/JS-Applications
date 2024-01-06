import { loginUser } from "../src/userService.js"
import { userData } from "../src/userHelper.js"
const loginTemp = document.getElementById("form-login")
let context;
function loginView(ctx){
ctx.showSection(loginTemp)
loginTemp.querySelector("form").addEventListener("submit",onSubmitHandler)
context = ctx
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
        debugger
        const response = await loginUser(data)
        debugger
        userData.setUserData(response)
        context.updateNav()
        context.goTo("/")
    }else{
        window.alert("error!")
    }
    event.target.reset()
}
export {
    loginView
}