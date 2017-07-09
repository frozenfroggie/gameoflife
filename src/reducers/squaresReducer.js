const INITIAL_ROWS = 49, INITIAL_COLS = 59;

function generateOrganismsInSquares(rows,cols) {    //only for initial squares state!
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

const squaresReducer = (state = 
    {
        squares: generateOrganismsInSquares(INITIAL_ROWS,INITIAL_COLS)
    },
    action) => {
        switch(action.type) {
            case "SET_SQUARES_INITIAL":
            case "SET_LOADED_SQUARES":
            case "SET_SQUARES":
                state = {
                    ...state,
                    squares: action.payload
                };
                break;
            case "CLEAR_SQUARES":
                state = {
                    ...state,
                    squares: action.payload
                    };
                break;
        }
        return state;
    };

export default squaresReducer;