import { registerUser } from "../src/userService.js"
import { userData } from "../src/userHelper.js"
const registerTemp = document.getElementById("form-sign-up")
let context;
function registerView(ctx){
ctx.showSection(registerTemp)
registerTemp.querySelector("form").addEventListener("submit",onSubmitHandler)
context = ctx
}

async function onSubmitHandler(event){
    event.preventDefault()
    debugger
    const formData = new FormData(event.target)
    const email = formData.get("email")
    const password = formData.get("password")
    const repeatPassword = formData.get("repeatPassword")
     
    const data = {
        email,
        password
    }
    if (email && password.length >= 6 && password === repeatPassword) {
        const response = await registerUser(data)
        debugger
        userData.setUserData(response)      
        debugger
        context.updateNav()       
        debugger
        context.goTo("/")
    }else{
        throw new Error("error")
    }
    event.target.reset()
}
export {
    registerView
}