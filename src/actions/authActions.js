export function adminLogin(profile) {
    return {
        type: "ADMIN_LOGIN",
        payload: profile
    };
}

export function userLogin(profile) {
    return {
        type: "USER_LOGIN",
        payload: profile
    };
}

export function logout() {
    return {
        type: "LOGOUT"
    };
}