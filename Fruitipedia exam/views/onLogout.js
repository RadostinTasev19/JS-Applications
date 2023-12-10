import {logoutUser} from "../src/userService.js"
export async function onLogout(ctx,next){
    await logoutUser()
    ctx.updateNav()
    ctx.goTo("/")
    next()
}
