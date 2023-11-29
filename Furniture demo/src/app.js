import  page  from "/node_modules/page/page.mjs"
import { catalogView } from "./views/catalogViews.js";
import { createView } from "./views/createViews.js";
import { detailsView  } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logOut.js";
import { myFurniture } from "./views/myFurniture.js";
import { registerView } from "./views/registerView.js";
import { userData } from "../src/authentication.js"
const userNav = document.querySelector('div#user')
const guestNav = document.querySelector('div#guest')
//define a route mapping path to the given callback
page("/",catalogView)
page("/catalog",catalogView)
page("/login",loginView)
page("/register",registerView)
page("/logout",logoutView)
page("/create",createView)
page("/details/:id",detailsView)
page("/edit/:id",editView)
page("/myfurniture",myFurniture)
updateNav()

page.start();

export function updateNav(){
    const user = userData.getUserData()
    if (user) { //we are logged in
        userNav.style.display = "inline"
        guestNav.style.display = "none"
    }else{ //we are logged out
        userNav.style.display = "none"
        guestNav.style.display = "inline"

    }
}