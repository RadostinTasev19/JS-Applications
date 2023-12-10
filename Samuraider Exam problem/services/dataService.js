import { get,put,post,del} from "../src/requester.js"
const dataEndpoinst = {
    allRecords: "/data/motorcycles?sortBy=_createdOn%20desc",
    createRecord: "/data/motorcycles",
    recordDetails: "/data/motorcycles/",
    deleteRecord:"/data/motorcycles/",
    editRecord:"/data/motorcycles/",
    readList: "/data/motorcycles/"
}

async function readList(query){
    return await get(dataEndpoinst.readList + `?where=model%20LIKE%20%22${query}%22`)
}

async function editRecord(postId,data){
    await put(dataEndpoinst.editRecord + postId,data)
}

async function deletePost(postId){
    await del(dataEndpoinst.deleteRecord + postId)
}
async function motorcycleDetails(postId){
   return await get(dataEndpoinst.recordDetails + postId)

}

async function createRecord(formData){
    await post(dataEndpoinst.createRecord,formData)

}

async function listAllRecords(){
    return await get(dataEndpoinst.allRecords)
}

export {
    listAllRecords,
    createRecord,
    motorcycleDetails,
    deletePost,
    editRecord,
    readList
}