const INITIAL_ROWS = 39, INITIAL_COLS = 49; //only for initial board size

const rowsColsReducer = (state = {
        rows: INITIAL_ROWS,
        cols: INITIAL_COLS
    },
    action) => {
    switch(action.type) {
        case "SET_ROWS":
            state = {
                ...state,
                rows: action.payload - 1
                };
            break;
        case "SET_COLS":
            state = {
                ...state,
                cols: action.payload - 1
                };
            break;
    }
    return state;
};

export default rowsColsReducer;