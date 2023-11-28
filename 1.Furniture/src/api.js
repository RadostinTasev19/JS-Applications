import { userData } from "./authentication.js"

const host = "http://localhost:3030";
export async function requester(url,method,data){
    debugger
    const options = {
        method,
        headers: {}
    }
    if (data) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
    }
    const user = userData.getUserData()
    if (user) {
        //we create a property x-authorization in options.headers which value will the the user's accessToken
        options.headers["x-authorization"] = user.accessToken
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

export function get(url){
    return requester(url,"GET")
}

export function post(url,data){
    debugger
    return requester(url,"POST",data)
}
export function put(url,data){
    return requester(url,"PUT",data)
}
export function del(url){
    return requester(url,"DELETE")
}
