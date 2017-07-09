const visibilityReducer = (state = {
    structuresVisibility: [true,true,true,true],
    menuVisibility: [false,false,false,false],
    savingPanelVisibility: false, 
    aboutVisibility: false,
    errorInputVisibility: false,
    errorAuthVisibility:  false
}, action) => {
    switch(action.type) {
        case "CHANGE_STRUCTURES_VISIBILITY":
            let visibleAfterChange = state.structuresVisibility;
            visibleAfterChange[action.payload] = state.structuresVisibility[action.payload] ? false : true; 
            state = {
                ...state,
                structuresVisibility: visibleAfterChange
            };
            break;
         case "CHANGE_MENU_VISIBILITY":
            visibleAfterChange = state.menuVisibility;
            visibleAfterChange[action.payload] = state.menuVisibility[action.payload] ? false : true; 
            state = {
                ...state,
                menuVisibility: visibleAfterChange
            };
            break;
        case "CHANGE_SAVING_PANEL_VISIBILITY":
            state = {
                ...state,
                savingPanelVisibility: action.payload
            };
            break;
        case "CHANGE_ABOUT_VISIBILITY":
            state = {
                ...state,
                aboutVisibility: action.payload
            };
            break;
        case "CHANGE_ERROR_INPUT_VISIBILITY":
             state = {
                ...state,
                errorInputVisibility: action.payload
            };
            break; 
        case "CHANGE_ERROR_AUTH_VISIBILITY":
             state = {
                ...state,
                errorAuthVisibility: action.payload
            };
            break;
    }
    return state;
};

export default visibilityReducer;