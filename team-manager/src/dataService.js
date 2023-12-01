//create an object which will hold properties, which values will be the service endpoints

//create functions which will invoke functions for the corresponding requests

//create an export object, which will hold the created functions, holding the corresponding requests
import { get } from "../src/api.js"
const dataEndpoints = {
    listAllTeams: "/data/teams",
    listAllMembers: "/data/members?where=status%3D%22member%22"
}

async function allTeams(){
const response = await get(dataEndpoints.listAllTeams)
return response
}

export const dataService = {
    allTeams,
}