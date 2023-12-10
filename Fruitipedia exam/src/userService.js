import { get,put,post,del} from "../src/requester.js"
import { userData } from "../src/userHelper.js"
const userEndpoints = {
    register: "/users/register",
    logout:"/users/logout",
    login:"/users/login"
}
const dataEndpoints = {
    getAllRecords: "/data/fruits?sortBy=_createdOn%20desc",
    createRecord: "/data/fruits",
    recordDetails:"/data/fruits/",
    editFruit:"/data/fruits/",
    deleteFruit: "/data/fruits/"
}


export async function getSearchData(data){
    return await get(`/data/fruits?where=name%20LIKE%20%22${data}%22`)
    
}

export async function deleteFruit(id){
    await del(dataEndpoints.deleteFruit + id)
}

export async function editFruit(id,formData){
    await put(dataEndpoints.editFruit + id,formData)
}

export async function fruitDetails(id){
    const data = await get(dataEndpoints.recordDetails + id)
    return data
}

export async function createRecord(formData){
    await post(dataEndpoints.createRecord,formData)

}

export async function allRecords(){
    const data = await get(dataEndpoints.getAllRecords)
    return data
}

export async function loginUser(formData){
    const response = await post(userEndpoints.login,formData)
    userData.setUserData(response)
}
export async function logoutUser(){
    await get(userEndpoints.logout)
    userData.removeUserData()
}

export async function registerUser(formData){
 const response = await post(userEndpoints.register,formData)
 userData.setUserData(response)
}