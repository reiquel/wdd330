import { loginRequest } from "./externalServices.mjs";
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

/*
*  Sends login credentials to the server host:
*   Parameters: 
*       Creds = 
*       Redirect = Where it is going to return
*/
export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch(err) {
        console.log("Error " + err.message.message);
    }

}

/*
*   Check if the user is already logged in
*/
export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);
    
    if (valid) {
        clearLocalStorage(tokenKey);
        
        let currentPath = window.location;
        console.log(currentPath);

        window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token;
}

/*
*   It is responsible for checking an existing token to make sure it is not expired. 
*       Return true/false.
*/
function isTokenValid(token) {
    if (token) {
       const decoded = jwt_decode(token);

       let currentDate = Date();

       if (decoded.exp * 1000 < currentDate.getTime()) {
        // Token expired
        console.log("Token is expired");
        return false;
       } else {
        console.log("Valid token");
        return true;
       }
       // No token found
    } else return false;
}