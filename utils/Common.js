
export const getUser = () => {

    const userStr = sessionStorage.getItem("user")
if(userStr) return JSON.parse(userStr)
else return null;

}

export const getToken = () => {
    return sessionStorage.getItem("jwt") || null;

}

export const removeUserSession = () => {
    sessionStorage.removeItem("jwt")
    sessionStorage.removeItem("user")
    
}

export const setUserSession = (jwt, user) => {
    sessionStorage.setItem("jwt", jwt)
    sessionStorage.setItem("user", JSON.stringify(user))

}

