import { userData } from "../src/userHelper.js"
const host = "http://localhost:3000"
async function requester(url,method,data){
    const options = {
        method,
        headers:{}
    }
    if (data) {
        
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
    }
    const user = userData.getUserData()
    if (user) {
        options.headers["X-Authorization"] = user.accessToken
    }
    try {
        debugger
        const response = await fetch(host + url,options)
        if (!response.ok) {
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
    return await requester(url,"GET")
}

async function post(url,data){
    return await requester(url,"POST",data)
}

async function put(url,data){
    await requester(url,"PUT",data)
}

async function del(url){
    await requester(url,"DELETE")
}

export{
    get,
    put,
    post,
    del
}