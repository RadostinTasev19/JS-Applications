import {get,put,post,del} from "../src/requester.js"
const endpoints = {
addPeople: "/data/going",
totalGoingCount: "/data/going",
specificGoingCount: "/data/going"
}
async function numGoingsUser(eventId,userId){
   return await get(endpoints.specificGoingCount + `?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

async function totalGoing(eventId){
    return await get(endpoints.totalGoingCount + `?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`)
}

async function eventRequest(eventId){
   return await post(endpoints.addPeople, eventId)
}

export {
    eventRequest,
    totalGoing,
    numGoingsUser
}

