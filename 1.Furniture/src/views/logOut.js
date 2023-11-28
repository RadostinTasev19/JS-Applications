import { get } from "../api.js"
import { userData  } from "../authentication.js"
import { updateNav } from "../app.js"
import  page  from "/node_modules/page/page.mjs"
export async function logoutView(){
    await get("/users/logout")
    debugger
    userData.removeUserData()
    debugger
    updateNav()
    debugger
    page.redirect("/")
}
