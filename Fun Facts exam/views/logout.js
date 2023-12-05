import { logout } from "../src/userService.js"
export async function onLogout(){
    await logout()
}