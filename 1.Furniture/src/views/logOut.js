import { get } from "../api.js"
import { userData  } from "../authentication.js"
import { updateNav } from "../app.js"
export async function logoutView(){
    const logOutBtn = document.querySelector("a#logoutBtn")
    const url = "users/logout"
    debugger
    get(url)
    userData.removeUserData()
    updateNav() 
}
