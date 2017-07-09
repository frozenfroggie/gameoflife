export function editName(structure, i) {
    return {
        type: "EDIT_NAME",
        payload: {structure: structure, key: i}
    };
}

export function changeInputName(name) {
    return {
        type: "CHANGE_INPUT_NAME",
        payload: name
    };
}

export function disableEditName() {
    return {
        type: "DISABLE_EDIT_NAME"
    };
}