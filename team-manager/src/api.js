import { userData } from "../src/userHelper.js"
const host = "http://localhost:3030"
export async function requester(url,method,data){
    //create options obj to include in the fetch method
const options = {
    method,
    headers:{}
}
if (data) {
    options.headers["Content-Type"] = "application/JSON"
    options.body = JSON.stringify(data)
}
const user = userData.getUserData()
if (user) {
    options.headers["x-authorization"] = user.accessToken
}
try {
    const response = await fetch(host + url,options)
    if (response.ok === false) {
        const error = await response.json()
        throw new Error(error.message)
    }
    if (response.status === 204) {
        return response
    }
    return await response.json()
} catch (error) {
    alert(error)
    throw error
}
}

//create functions for each request type

export async function get (url){
    const response = await requester(url,"GET")
    return response
}
export async function post(url,data){
    const response = await requester(url,"POST",data)
    return response
}
export async function put(url,data){
    const response = await requester(url,"PUT",data)
    return response
}
export async function del(url){
    const response = await requester(url,"DELETE")
}