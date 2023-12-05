import { userData } from "../src/userHelper.js";
import { get,post,put,del} from "../src/requester.js"
import { userEndpoints,dataEndpoints } from "../src/paths.js";
import { updateNav } from "../src/app.js"
import page from "/node_modules/page/page.mjs"
export async function register(formData){
    const data = await post (userEndpoints.register,formData)
    userData.setUserData(data)
    updateNav()
    page.redirect("/")
}
export async function login(formData){
    const data = await post(userEndpoints.login,formData)
    userData.setUserData(data)
    updateNav()
    page.redirect("/")
}
export async function logout(){
    await get (userEndpoints.logout)
    userData.removeUserData()
    updateNav()
    page.redirect("/")
}

export async function funFactsData(){
    const data = await get(dataEndpoints.funFactList)
    return data
}

export async function funFactDetails(id){
    const data = await get(dataEndpoints.singleFact + id)
    return data
}
export async function createFact(formData){
    await post(dataEndpoints.createFact,formData)
    page.redirect("/dashboard")
}
export async function editFact(id,formData){
     await put(dataEndpoints.editFact + id,formData)
    page.redirect(`/details/${id}`)
}
export async function deleteFact(id){
await del(dataEndpoints.deleteFact + id)
page.redirect("/dashboard")
}

export async function likeFact(id){
await post(dataEndpoints.likeFact,id)

}

export async function getTotalLikes(query){
    const likes = await get(`/data/likes?where=factId%3D%22${query}%22&distinct=_ownerId&count`)
    return likes
}

export async function getSpecificLikes(factId,userId){
    const data = await get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return data
}