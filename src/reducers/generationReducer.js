const generationReducer = (state = {generation: 0}, action) => {
    switch(action.type) {
         case "SET_SQUARES":
            state = {
                ...state,
                generation: state.generation + 1
                };
            break;
        case "CLEAR_SQUARES":
            state = {
                ...state,
                generation: 0
            };
            break;
    }
    return state;
};

export default generationReducer;