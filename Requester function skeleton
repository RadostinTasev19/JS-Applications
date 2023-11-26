import { userData } from "./authentication.js"
const host = "http://localhost:3030";
async function requester(url,method,data){
    const options = {
        method
    }
    if (data) {
        options.headers = {"Content-Type": "application/json"},
        options.body = JSON.stringify({data})
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
    return requester("GET",url)
}

export function post(url,data){
    return requester("POST", url,data)
}
export function put(url,data){
    return requester("PUT",url,data)
}
export function del(url){
    return requester("DELETE",url)
}
