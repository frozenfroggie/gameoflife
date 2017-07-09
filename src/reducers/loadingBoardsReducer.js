let structures = {
    still_lifes: [],
    oscillators: [],
    spaceships: [],
    local_storage: []
    };

const loadingBoardsReducer = (state = structures, action) => {
    switch(action.type) {
        case "LOAD_SPACESHIPS":
            state = {
                ...state,
                spaceships: [
                    ...state.spaceships,
                    {id: action.payload._id, name: action.payload.name, board: action.payload.savedBoard}
                    ]
            };
            break;
         case "LOAD_OSCILLATORS":
            state = {
                ...state,
                 oscillators: [
                    ...state.oscillators,
                    {id: action.payload._id, name: action.payload.name, board: action.payload.savedBoard}
                    ]
            };
            break;
         case "LOAD_STILL_LIFES":
            state = {
                ...state,
                 still_lifes: [
                     ...state.still_lifes,
                    {id: action.payload._id, name: action.payload.name, board: action.payload.savedBoard}
                    ]
            };
            break;
         case "LOAD_LOCAL_STORAGE":
            state = {
                ...state,
                 local_storage: [
                     ...state.local_storage,
                    {name: action.payload.name, board: action.payload.savedBoard}
                    ]
            };
            break;
        case "CLEAR_EVERYTHING":
            state = {
                ...state,
                still_lifes: [],
                oscillators: [],
                spaceships: [],
                local_storage: []
            };
            break;
    }
    return state;
};

export default loadingBoardsReducer;