const userData = {
    getUserData: () => JSON.parse(sessionStorage.getItem("userData")),
    setUserData: (data) => sessionStorage.setItem("userData",JSON.stringify(data)),
    removeUserData: () => sessionStorage.removeItem("userData")
}
function userId(){
    const user = userData.getUserData()
    if (user) {
        return user._id
    }
}

export {
    userData,
    userId
}