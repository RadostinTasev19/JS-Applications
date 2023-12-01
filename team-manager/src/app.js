import page from "/node_modules/page/page.mjs"
import { homeView } from "../views/homeView.js"
import { registerView } from "../views/registerView.js"
import { createView } from "../views/createView.js"
import { editView } from "../views/editView.js"
import { browseView } from "../views/browseView.js"
import { myTeams } from "../views/myTeams.js"
import { teamHome } from "../views/teamHomeView.js"
import { loginView } from "../views/loginView.js"
import { userData } from "../src/userHelper.js"
import { logout } from "../views/logoutView.js"

page("/",homeView)
page("/login",loginView)
page("/logout",logout)
page("/register",registerView)
page("/create",createView)
page("/edit",editView)
page("/browse",browseView)
page("/myTeams",myTeams)
page("/teamHome",teamHome)

page.start()
const userDiv = document.querySelector("div#user")
const guestDiv = document.querySelector("div#guest")

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