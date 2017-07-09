const authReducer = (state = {admin: false, user: false, name: 'user'}, action) => {
    switch(action.type) {
        case "ADMIN_LOGIN":
            state = {
                ...state,
                admin: true,
                name: action.payload
            };
            break;
         case "USER_LOGIN":
            state = {
                ...state,
                user: true,
                name: action.payload
            };
            break;
        case "LOGOUT":
            state = {
                ...state,
                admin: false,
                user: false
            };
    }
    return state;
};

export default authReducer;