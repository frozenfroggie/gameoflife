const INITIAL_ROWS = 49, INITIAL_COLS = 79;

function generateOrganismsInSquares(rows,cols) {
    let squares = [];
    for(var j=0; j <= rows; j++){
      squares.push([]);
      squares[j].push( new Array(cols));
      for(var i=0; i <= cols; i++){
        squares[j][i] = {alive: false};
      }
    }
    return squares;
}

const initialState = {
        squares: generateOrganismsInSquares(INITIAL_ROWS,INITIAL_COLS),
        rowsNum: INITIAL_ROWS,
        colsNum: INITIAL_COLS
};

const squaresReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_SQUARES":
            state = {
                ...state,
                squares: action.payload
            };
            break;
        case "SET_ROWS":
            state = {
                ...state,
                rowsNum: action.payload - 1
                };
            break;
        case "SET_COLS":
            state = {
                ...state,
                colsNum: action.payload - 1
                };
            break;
    }
    return state;
};

export default squaresReducer;