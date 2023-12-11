import { get,put,post,del } from "../src/requester.js"
const dataEndpoints = {
    getAllAdds: "/data/events?sortBy=_createdOn%20desc",
    createAdd:"/data/events",
    addDetails: "/data/events/",
    editRecord: "/data/events/",
    deleteRecord: "/data/events/"
}
async function deleteRecord(postId){
    await del(dataEndpoints.deleteRecord + postId)
}

async function editEvent(postId,formData){
    await put(dataEndpoints.editRecord + postId, formData)

}

async function getDetails(postId){
    return await get(dataEndpoints.addDetails + postId)
}
async function createAdd(formData){
    await post(dataEndpoints.createAdd,formData)
}

async function getAllRecords(){
    return await get(dataEndpoints.getAllAdds)
}


export {
    getAllRecords,
    createAdd,
    getDetails,
    editEvent,
    deleteRecord
}