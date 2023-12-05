const userEndpoints = {
    register: "/users/register",
    login: "/users/login",
    logout: "/users/logout",
}
const dataEndpoints = {
    funFactList: "/data/facts?sortBy=_createdOn%20desc",
    singleFact: "/data/facts/",
    createFact: "/data/facts",
    editFact: "/data/facts/",
    deleteFact: "/data/facts/",
    likeFact: "/data/likes",
}
export { 
    userEndpoints,
    dataEndpoints
}