export function setSquares(newSquares) {
    return {
        type: "SET_SQUARES",
        payload: newSquares
    };
}

export function setLoadedSquares(loadedSquares) {
    return {
        type: "SET_LOADED_SQUARES",
        payload: loadedSquares
    };
}

export function setSquaresInitial(initialSquares) {
    return {
        type: "SET_SQUARES_INITIAL",
        payload: initialSquares
    };
}

export function clearSquares(blankSquares) {
    return {
        type: "CLEAR_SQUARES",
        payload: blankSquares
    };
}