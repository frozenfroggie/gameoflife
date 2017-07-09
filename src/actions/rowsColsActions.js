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