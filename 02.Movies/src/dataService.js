import { requester } from "../src/requester.js"
const baseUrl = "http://localhost:3030"
const endpoints = {
    getAllMovies: "/data/movies",
    createMovie: "/data/movies",
    updateMovie: "/data/movies/",
    deleteMovie: "/data/movies/",
    getMovieDetails: "/data/movies/",
    likeMovie : "/data/likes"
}

async function specificUserLike(movieId,user){
    if (!user) {
        return false;
    } else{
        const userId = user._id
        const like = await requester(baseUrl + `/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`)
        return like.length > 0
        //function returns true or false
    }
    
}
async function deleteMovie(id){
    await requester(baseUrl + endpoints.deleteMovie + `${id}`,"DELETE")
}

async function getLikesCount(movieId){
const response = await requester(baseUrl + `/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,"GET")
return response
}
async function likeMovie(body){
    const response = await requester(baseUrl + endpoints.likeMovie,"POST",body)
    return response
}
async function getAllMovies(){
    const data = await requester(baseUrl + endpoints.getAllMovies, "GET")
    return data
}

async function createMovie(formData){
    const data = await requester(baseUrl + endpoints.createMovie,"POST",formData)
    return data
}

async function updateMovie(id,data){
    const response = await requester(baseUrl + endpoints.updateMovie + `${id}`,"PUT",data)
    return response
}
async function getMovieDetails(id){
    const response = await requester(baseUrl + endpoints.getMovieDetails + `${id}`,"GET")
    return response
}

export {
    getAllMovies,
    createMovie,
    updateMovie,
    getMovieDetails,
    likeMovie,
    getLikesCount,
    deleteMovie,
    specificUserLike
}
