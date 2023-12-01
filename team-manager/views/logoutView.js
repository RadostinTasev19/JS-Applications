import { userData } from "../src/userHelper.js";
import page from "../node_modules/page/page.mjs"
import { updateNav } from "../src/app.js";
import { get } from "../src/api.js"
export async function logout(){
await get("/users/logout")
userData.removeUserData()
updateNav()
page.redirect("/")
}