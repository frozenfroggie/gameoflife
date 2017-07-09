export function changeErrorInputVisbility(bool) {
    return {
        type: "CHANGE_ERROR_INPUT_VISIBILITY",
        payload: bool
    };
}
export function changeErrorAuthVisibility(bool) {
    return {
        type: "CHANGE_ERROR_AUTH_VISIBILITY",
        payload: bool
    };
}

export function showSavingPanel(bool) {
    return {
        type: "CHANGE_SAVING_PANEL_VISIBILITY",
        payload: bool
    };
}

export function showAbout(bool) {
    return {
        type: "CHANGE_ABOUT_VISIBILITY",
        payload: bool
    };
}

export function showHideStructures(which) {
    return {
        type: "CHANGE_STRUCTURES_VISIBILITY",
        payload: which
    };
}

export function showHideMenu(which) {
    return {
        type: "CHANGE_MENU_VISIBILITY",
        payload: which
    };
}