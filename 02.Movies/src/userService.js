import { requester } from "../src/requester.js"
const baseUrl = "http://localhost:3030"
const userEndpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout"
}

async function registerUser(formData){
    const response = await requester(baseUrl + userEndpoints.register,"POST",formData)
    return response
}

async function loginUser(formData){
    const response = await requester(baseUrl + userEndpoints.login,"POST",formData)
    return response
}
export {
    registerUser,
    loginUser
    // logoutUser
}

