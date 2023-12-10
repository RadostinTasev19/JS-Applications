import { get,put,post,del} from "../src/requester.js"
const userEndpoints = {
    register:"/users/register",
    login: "/users/login",
    logout:"/users/logout"
}

async function registerUser(formData){
    const data = await post(userEndpoints.register,formData)
    return data
}
async function loginUser(formData){
    const data = await post(userEndpoints.login,formData)
    return data
}
async function logoutUser(){
    await get(userEndpoints.logout)
}

export {
    registerUser,
    loginUser,
    logoutUser
}


