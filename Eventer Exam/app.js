import page from "../node_modules/page/page.mjs"
import { render } from "./node_modules/lit-html/lit-html.js"
import { userData, userId } from "./src/userHelper.js"
import { createPage } from "./views/createPage.js"
import { dashboardPage } from "./views/dashboardPage.js"
import { homePage } from "./views/homePage.js"
import { loginPage } from "./views/loginPage.js"
import { onLogout } from "./views/onLogout.js"
import { registerPage } from "./views/registerPage.js"
import { detailsPage } from "./views/detailsPage.js"
import { editPage } from "./views/editPage.js"
const root = document.querySelector("main#root")


page("/",decoratorContext,homePage)
page("/dashboard",decoratorContext,dashboardPage)
page("/create",decoratorContext,createPage)
page("/logout",decoratorContext, onLogout)
page("/login",decoratorContext,loginPage)
page("/register",decoratorContext,registerPage)
page("/details/:id",decoratorContext,detailsPage)
page("/edit/:id",decoratorContext,editPage)

page.start()

function renderer(template){
render(template,root)
}

function goTo(path){
    page.redirect(path)
}


const userDiv = document.querySelector("div.user")
const guestDiv = document.querySelector("div.guest")

function updateNav(){
const user = userData.getUserData()
if (user) { // if we are logged in
    userDiv.style.display = "block"
    guestDiv.style.display = "none"
}else{
    userDiv.style.display = "none"
    guestDiv.style.display = "block"
}
}
updateNav()
function decoratorContext(ctx,next){
    ctx.render = renderer
    ctx.goTo = goTo
    ctx.updateNav = updateNav
    ctx.userData = userData
    ctx.userId = userId
    next()
}