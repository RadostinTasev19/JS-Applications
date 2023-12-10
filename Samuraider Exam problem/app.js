import page from "../node_modules/page/page.mjs"
import { render } from "../node_modules/lit-html/lit-html.js"
import { userData } from "./src/userHelper.js"
import { homePage } from "./views/homePage.js"
import { registerPage } from "./views/registerPage.js"
import { onLogout } from "./views/onLogout.js"
import { loginPage } from "./views/loginView.js"
import { dashboardPage } from "./views/dashboardPage.js"
import { createPage } from "./views/createPage.js"
import { detailsPage } from "./views/detailsPage.js"
import { editPage } from "./views/editPage.js"
import { searchPage } from "./views/searchPage.js"
const root = document.querySelector("main#root")

page(decoratorContext)
page("/",homePage)
page("/dashboard",dashboardPage)
page("/search",searchPage)
page("/create",createPage)
page("/logout",onLogout)
page("/login",loginPage)
page("/register",registerPage)
page("/details/:id",detailsPage)
page("/edit/:id",editPage)

page.start()
//create decorator functions
function renderer(template){
render(template,root)
}
function goTo(path){
    page.redirect(path)
}

function decoratorContext(ctx,next){
    ctx.render = renderer
    ctx.goTo = goTo
    ctx.updateNav = updateNav
    ctx.userData = userData
    next()// calls the next registered callback with the given path
}


const userDiv = document.querySelector("div.user")
const guestDiv = document.querySelector("div.guest")
function updateNav(){
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
