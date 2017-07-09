const editNameReducer = (state = {nameToEdit: {}, inputName: ''}, action) => {
    switch(action.type) {
        case "EDIT_NAME":
            state = {
                ...state,
                nameToEdit: {structure: action.payload.structure, key: action.payload.key},
                inputName: action.payload.structure.name
            };
            break;
        case "CHANGE_INPUT_NAME":
            state = {
                ...state,
                inputName: action.payload
            };
            break;
        case "DISABLE_EDIT_NAME":
            state = {
                ...state,
                nameToEdit: {},
                inputName: ''
            };
            break;
    }
    return state;
};

export default editNameReducer;