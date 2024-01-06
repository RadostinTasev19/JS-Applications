import { userData } from "./userHelper.js"
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
        options.headers["x-authorization"] = user.accessToken
    }
    try {
        const response = await fetch(url,options)
        if (!response.ok) {
            window.alert(response.message)
            throw new Error("Error")
        }
        return response.json()
        
    } catch (error) {
        throw new Error(error)
    }

}
export{
    requester
}