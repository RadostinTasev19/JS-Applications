import { registerView } from "../views/registerView.js"
import { loginView } from "../views/loginView.js"
import { homeView } from "../views/homeView.js"
import { userData } from "./userHelper.js"
import {addMovie} from "../views/createView.js"

const nav = document.querySelector("nav")
const allSections = [...document.querySelectorAll(".view-section")]
nav.addEventListener("click",onNavigate)
const addButton = document.getElementById("add-movie-button")
addButton.addEventListener("click",onNavigate)
updateNav()

const routes = {
    "/": (ctx) => {homeView(ctx)},
    "/login": (ctx) => {loginView(ctx)},
    "/register": (ctx) => {registerView(ctx)},
    "/logout": (ctx) => {onLogout(ctx)},
    "/addMovie": (ctx) => {addMovie(ctx)}
}


function hideAll(){
    allSections.forEach((x) => x.style.display = "none")
}
hideAll()
function showSection(section){
  hideAll()
  section.style.display = "block"
}
const ctx = {
    showSection,
    updateNav,
    goTo
}

function goTo(name,...params){
    const handler = routes[name]
    handler(ctx)
}

function updateNav(){
const user = userData.getUserData()
const userLi = document.querySelectorAll(".user")
const guestLi = document.querySelectorAll(".guest")
if (user) {
    userLi.forEach((li) => {
        li.style.display = "block"
    })
    guestLi.forEach((li) => {
        li.style.display = "none"
    })
}else{
    userLi.forEach((li) => {
        li.style.display = "none"
    })
    guestLi.forEach((li) => {
        li.style.display = "block"
    })
}
}
function onNavigate(event){
    event.preventDefault()
    
    if (event.target.tagName !== "A" && event.target.href === "") {
        return;
    }
    const viewName = new URL(event.target.href).pathname
    const handler = routes[viewName]
    handler(ctx)
}

async function onLogout(ctx){
// const data = await logoutUser()
userData.removeUserData()
ctx.updateNav()
ctx.goTo("/login")
}
goTo("/")
export {
    showSection
}
