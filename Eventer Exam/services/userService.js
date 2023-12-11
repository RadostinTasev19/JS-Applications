import { get,put,post,del } from "../src/requester.js"

const userEndpoinst = {
    register: "/users/register",
    login:"/users/login",
    logout: "/users/logout"
}

async function register(formData){
 return await post(userEndpoinst.register,formData)
}

async function login(formData){
    return await post(userEndpoinst.login,formData)
}
async function logout(){
    await get(userEndpoinst.logout)
}

export { 
    register,
    login,
    logout
}