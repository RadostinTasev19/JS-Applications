import { userData } from "../src/userHelper.js"
const host = "http://localhost:3030"
async function requester(url,method,data){
    const options = {
        method,
        headers:{}
    }
    if (data) {
        options.headers["Content-Type"] = "application/json",
        options.body = JSON.stringify(data)
    }
    const user = userData.getUserData()
    if (user) {
        //we create a property x-authorization in options.headers which value will the the user's accessToken
        options.headers["X-Authorization"] = user.accessToken
    }

    try {
        
        const response = await fetch(host + url, options)
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

async function get(url){
    const response = await requester(url,"GET")
    return response
}
async function post(url,data){
    const response = await requester(url,"POST",data)
    return response
}
async function put(url,data){
    const response = await requester(url,"PUT",data)
    return response
}
async function del(url){
    await requester(url,"DELETE")
}

export {
    get,
    post,
    put,
    del
}