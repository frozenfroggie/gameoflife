export function setSquares(generatedSquares) {
    return {
        type: "SET_SQUARES",
        payload: generatedSquares
    };
}

export function resizeRows(rows) {
    return {
        type: "SET_ROWS",
        payload: rows
    };
}

export function resizeCols(cols) {
    return {
        type: "SET_COLS",
        payload: cols
    };
}