import { logout } from "../services/userService.js"

async function onLogout(ctx,next){
await logout()
ctx.userData.removeUserData()
ctx.updateNav()
ctx.goTo("/")
}

export{
    onLogout
}