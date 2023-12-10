import { userData } from "../src/userHelper.js"
import page from "/node_modules/page/page.mjs"
import { html,render } from "../node_modules/lit-html/lit-html.js"
import { homePage } from "../views/homePage.js"
import { registerPage } from "../views/registerPage.js"
import { onLogout } from "../views/onLogout.js"
import { loginPage } from "../views/loginPage.js"
import { dashboardPage } from "../views/dashboardView.js"
import { createPage } from "../views/createPage.js"
import { detailsPage } from "../views/detailsPage.js"
import { editPage } from "../views/editPage.js"
import { searchPage } from "../views/searchPage.js"

const root = document.querySelector("main#root")
page(decoratorContext)
page("/",homePage)
page("/dashboard",dashboardPage);
page("/search",searchPage);
page("/create",createPage)
page("/logout",onLogout)
page("/login",loginPage)
page("/register",registerPage);
page("/details/:id",detailsPage)
page("/edit/:id",editPage)

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
if (user) {
    userDiv.style.display = "block"
    guestDiv.style.display = "none"
}else{//if we are logged out
    userDiv.style.display = "none"
    guestDiv.style.display = "block"
}
}
updateNav()
function decoratorContext(ctx,next){
    ctx.render = renderer; // we attach a property render to the ctx object
    ctx.goTo = goTo;
    ctx.updateNav = updateNav;
    ctx.userData = userData

    next()
}