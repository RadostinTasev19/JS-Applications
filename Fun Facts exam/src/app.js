import { userData } from "../src/userHelper.js"
import { html,render } from "../node_modules/lit-html/lit-html.js"
import page from "/node_modules/page/page.mjs"

import { addFact } from "../views/addFact.js"
import { logout } from "../src/userService.js"
import { loginView } from "../views/loginView.js"
import { registerView } from "../views/registerView.js"
import { homeView } from "../views/homeView.js"
import { dashboardView } from "../views/dashboardView.js"
import { detailsView } from "../views/details.js"
import { edit } from "../views/editView.js"
import { deleteView } from "../views/deleteView.js"

page("/",homeView)
page("/dashboard",dashboardView)
page("/details/:id",detailsView)
page("/create",addFact)
page("/logout",logout)
page("/login",loginView)
page("/register",registerView)
page("/create",addFact)
page("/edit/:id",edit)
page("/delete/:id",deleteView)

page.start()
export function renderer(template,root){
    render(template,root)
}
// export function decoratorContext(ctx,next){
//     ctx.renderer
//     next()
// }

const userDiv = document.querySelector("div.user")
const guestDiv = document.querySelector("div.guest")
export function updateNav(){
    const user = userData.getUserData()
    if (user) {
        userDiv.style.display = "block"
        guestDiv.style.display = "none"
    }else{
        userDiv.style.display = "none"
        guestDiv.style.display = "block"
    }
}
updateNav()

